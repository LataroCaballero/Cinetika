<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Hito;
use App\Models\Medicion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

use \PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use \PhpOffice\PhpSpreadsheet\Writer\Csv;
use \PhpOffice\PhpSpreadsheet\Spreadsheet;


class MedicionController extends Controller
{
    public function index(Hito $hito): JsonResponse
    {
        $mediciones = $hito->mediciones()->get();
        //aplicar a cada medicion la funcion show del modelo
        for ($i = 0; $i < count($mediciones); $i++) {
            $mediciones[$i]=$mediciones[$i]->show();
        }
        return response()->json($mediciones);
    }

    public static function store_excel(String $xlsx_file, String $rutaGuardado, String $nombreArchivo):String
    {
        //abrir excel 
        $reader = new Xlsx();
        $spreadsheet = $reader->load($xlsx_file);
        $loadedSheetNames = $spreadsheet->getSheetNames();
        $writer = new Csv($spreadsheet);

         // Crear directorio para mediciones si no existe
        if (!file_exists($rutaGuardado)) {
            mkdir($rutaGuardado, 0755, true);
        }

        //Guardar csv
        $csvPath = null;
        // Iterar sobre las hojas para transponer y guardar como CSV
        foreach ($loadedSheetNames as $sheetIndex => $loadedSheetName) {
            $sheet = $spreadsheet->getSheet($sheetIndex);
            $data = $sheet->toArray();

            // Transponer filas y columnas
            $transposedData = array_map(null, ...$data);

            // Crear un nuevo Spreadsheet para el CSV transpuesto
            $newSpreadsheet = new Spreadsheet();
            $newSheet = $newSpreadsheet->getActiveSheet();
            $newSheet->fromArray($transposedData);

            // Guardar como CSV
            $writer = new Csv($newSpreadsheet);
            $csvPath = $rutaGuardado . $nombreArchivo . '_' . $loadedSheetName . '.csv';
            $writer->save($csvPath);
        }
        
        return $csvPath;
    }

    public function store(Request $request, Hito $hito): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'fecha' => 'required|date',
            'tipo_medicion' => 'required|in:tipo1,tipo2,tipo3',
            'archivo' => 'required|file|mimetypes:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|max:2000'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        //asociar hito
        $medicion = $hito->mediciones()->create([
            'fecha' => $request->fecha,
            'tipo_medicion' => $request->tipo_medicion,
            'ruta_archivo_medicion' => null // Inicializamos como null, se actualizará después
        ]);

        // Obtener nombre del paciente del hito
        $nombrePaciente = $hito->paciente->nombre_apellido ?? 'sin_nombre';
        $nombrePaciente = str_replace(' ', '_', strtolower($nombrePaciente));
        
        //obtener ruta y nombre del archivo
        $rutaGuardado = storage_path(path: 'app\private\mediciones\\' . $nombrePaciente . '\\');
        $nombreArchivo = $nombrePaciente . '_' . $medicion->id_medicion;

        //guardar archivo
        $csvPath = $this->store_excel($request->archivo, $rutaGuardado, $nombreArchivo);
        
        if ($csvPath) {
            $medicion->ruta_archivo_medicion = $csvPath;
        }
        $medicion->save();
        return response()->json($medicion, 201);
    }

    public function show(Medicion $medicion): JsonResponse
    {
        return response()->json($medicion->show());
    }

    public function update(Request $request, Medicion $medicion): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'fecha' => 'required|date',
            'tipo_medicion' => 'required|in:tipo1,tipo2,tipo3',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $medicion->update($request->all());
        return response()->json($medicion);
    }

    public function destroy(Medicion $medicion): JsonResponse
    {
        $medicion->delete();
        return response()->json(null, 204);
    }
} 
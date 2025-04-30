<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Hito;
use App\Models\Medicion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class MedicionController extends Controller
{
    public function index(Hito $hito): JsonResponse
    {
        $mediciones = $hito->mediciones()->with('repeticiones')->get();
        return response()->json($mediciones);
    }

    public function store(Request $request, Hito $hito): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'fecha' => 'required|date',
            'tipo_medicion' => 'required|in:tipo1,tipo2,tipo3',
            'metricas' => 'required|array',
            'repeticiones' => 'required|array|min:1|max:5',
            'repeticiones.*.valores' => 'required|array'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $medicion = $hito->mediciones()->create([
            'fecha' => $request->fecha,
            'tipo_medicion' => $request->tipo_medicion,
            'metricas' => $request->metricas
        ]);

        foreach ($request->repeticiones as $repeticionData) {
            $medicion->repeticiones()->create([
                'valores' => $repeticionData['valores']
            ]);
        }

        return response()->json($medicion->load('repeticiones'), 201);
    }

    public function show(Medicion $medicion): JsonResponse
    {
        return response()->json($medicion->load('repeticiones'));
    }

    public function update(Request $request, Medicion $medicion): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'fecha' => 'required|date',
            'tipo_medicion' => 'required|in:tipo1,tipo2,tipo3',
            'metricas' => 'required|array'
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
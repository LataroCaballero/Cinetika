<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Hito;
use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class HitoController extends Controller
{
    public function index(Paciente $paciente): JsonResponse
    {
        $hitos = $paciente->hitos()->with('mediciones')->get();
        return response()->json($hitos);
    }

    public function store(Request $request, Paciente $paciente): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'patologia' => 'required|string|max:255',
            'fecha' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $hito = $paciente->hitos()->create($request->all());
        return response()->json($hito, 201);
    }

    public function show(Hito $hito): JsonResponse
    {
        return response()->json($hito->load(['mediciones.repeticiones']));
    }

    public function update(Request $request, Hito $hito): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'patologia' => 'required|string|max:255',
            'fecha' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $hito->update($request->all());
        return response()->json($hito);
    }

    public function destroy(Hito $hito): JsonResponse
    {
        $hito->delete();
        return response()->json(null, 204);
    }
} 
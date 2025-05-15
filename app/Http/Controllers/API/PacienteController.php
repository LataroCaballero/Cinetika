<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class PacienteController extends Controller
{
    public function index(): JsonResponse
    {
        $pacientes = Paciente::all();
        return response()->json($pacientes);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nombre_apellido' => 'required|string|max:255',
            'dni' => 'required|string|unique:pacientes',
            'fecha_nac' => 'required|date',
            'email' => 'nullable|email',
            'telefono' => 'nullable|string',
            'grupo' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $paciente = Paciente::create($request->all());
        return response()->json($paciente, 201);
    }

    public function show(Paciente $paciente): JsonResponse
    {
        return response()->json($paciente->load('hitos'));
    }

    public function update(Request $request, Paciente $paciente): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nombre_apellido' => 'required|string|max:255',
            'dni' => 'required|string|unique:pacientes,dni,' . $paciente->id_paciente . ',id_paciente',
            'fecha_nac' => 'required|date',
            'email' => 'nullable|email',
            'telefono' => 'nullable|string',
            'grupo' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $paciente->update($request->all());
        return response()->json($paciente);
    }

    public function destroy(Paciente $paciente): JsonResponse
    {
        $paciente->delete();
        return response()->json(null, 204);
    }

    public function historialCompleto(Paciente $paciente): JsonResponse
    {
        $historial = $paciente->load([
            'hitos',
            'hitos.mediciones',
        ]);
        
        return response()->json($historial);
    }
} 
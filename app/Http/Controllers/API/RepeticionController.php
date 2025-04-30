<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Medicion;
use App\Models\Repeticion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class RepeticionController extends Controller
{
    public function index(Medicion $medicion): JsonResponse
    {
        $repeticiones = $medicion->repeticiones;
        return response()->json($repeticiones);
    }

    public function store(Request $request, Medicion $medicion): JsonResponse
    {
        // Verificar que no exceda el límite de 5 repeticiones
        if ($medicion->repeticiones()->count() >= 5) {
            return response()->json([
                'error' => 'No se pueden agregar más de 5 repeticiones por medición'
            ], 422);
        }

        $validator = Validator::make($request->all(), [
            'valores' => 'required|array'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $repeticion = $medicion->repeticiones()->create($request->all());
        return response()->json($repeticion, 201);
    }

    public function show(Repeticion $repeticion): JsonResponse
    {
        return response()->json($repeticion);
    }

    public function update(Request $request, Repeticion $repeticion): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'valores' => 'required|array'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $repeticion->update($request->all());
        return response()->json($repeticion);
    }

    public function destroy(Repeticion $repeticion): JsonResponse
    {
        $repeticion->delete();
        return response()->json(null, 204);
    }
} 
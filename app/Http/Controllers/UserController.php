<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|unique:users',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $usuario = User::create($request->all());
        return response()->json("Usuario creado correctamente", 201);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json("Paciente eliminado correctamente", 204);
    }

}

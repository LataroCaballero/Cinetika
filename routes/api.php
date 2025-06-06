<?php

use App\Http\Controllers\API\PacienteController;
use App\Http\Controllers\API\HitoController;
use App\Http\Controllers\API\MedicionController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
//Rutas de autenticacion publicas
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

//Rutas con acceso autenticado
Route::middleware('jwt.auth')->group(function () {
    Route::get('profile', function (Request $request) {
        return response()->json($request->auth); // usuario autenticado
    });
    // Rutas para Pacientes
    Route::apiResource('pacientes', PacienteController::class);
    Route::get('pacientes/{paciente}/historial-completo', [PacienteController::class, 'historialCompleto']);
    Route::get('pacientes', [PacienteController::class, 'index']);
    Route::post('pacientes', [PacienteController::class, 'store']);
    Route::put('pacientes/{paciente}', [PacienteController::class, 'update']);
    Route::delete('pacientes/{paciente}', [PacienteController::class, 'destroy']);
    
    // Rutas para Hitos (anidadas con pacientes)
    Route::get('pacientes/{paciente}/hitos', [HitoController::class, 'index']);
    Route::post('pacientes/{paciente}/hitos', [HitoController::class, 'store']);
    Route::get('hitos/{hito}', [HitoController::class, 'show']);
    Route::put('hitos/{hito}', [HitoController::class, 'update']);
    Route::delete('hitos/{hito}', [HitoController::class, 'destroy']);

});

// Rutas para Mediciones (anidadas con hitos)
Route::get('hitos/{hito}/mediciones', [MedicionController::class, 'index']);
Route::post('hitos/{hito}/mediciones', [MedicionController::class, 'store']);
Route::get('mediciones/{medicion}', [MedicionController::class, 'show']);
Route::put('mediciones/{medicion}', [MedicionController::class, 'update']);
Route::delete('mediciones/{medicion}', [MedicionController::class, 'destroy']);


Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando']);
}); 
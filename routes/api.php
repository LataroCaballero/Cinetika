<?php

use App\Http\Controllers\API\PacienteController;
use App\Http\Controllers\API\HitoController;
use App\Http\Controllers\API\MedicionController;
use App\Http\Controllers\API\RepeticionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Rutas para Pacientes
Route::apiResource('pacientes', PacienteController::class);
Route::get('pacientes/{paciente}/historial-completo', [PacienteController::class, 'historialCompleto']);
Route::get('pacientes', [PacienteController::class, 'index']);
Route::post('pacientes', [PacienteController::class, 'store']);
Route::put('pacientes', [PacienteController::class, 'update']);
Route::delete('pacientes', [PacienteController::class, 'destroy']);

// Rutas para Hitos (anidadas con pacientes)
Route::get('pacientes/{paciente}/hitos', [HitoController::class, 'index']);
Route::post('pacientes/{paciente}/hitos', [HitoController::class, 'store']);
Route::get('hitos/{hito}', [HitoController::class, 'show']);
Route::put('hitos/{hito}', [HitoController::class, 'update']);
Route::delete('hitos/{hito}', [HitoController::class, 'destroy']);

// Rutas para Mediciones (anidadas con hitos)
Route::get('hitos/{hito}/mediciones', [MedicionController::class, 'index']);
Route::post('hitos/{hito}/mediciones', [MedicionController::class, 'store']);
Route::get('mediciones/{medicion}', [MedicionController::class, 'show']);
Route::put('mediciones/{medicion}', [MedicionController::class, 'update']);
Route::delete('mediciones/{medicion}', [MedicionController::class, 'destroy']);


Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando']);
}); 
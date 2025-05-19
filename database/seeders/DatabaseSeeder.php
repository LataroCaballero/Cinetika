<?php

namespace Database\Seeders;

use App\Models\Paciente;
use App\Models\Hito;
use App\Models\Medicion;
use App\Models\Repeticion;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear 5 pacientes
        Paciente::factory(20)->create()->each(function ($paciente) {
            // Para cada paciente, crear 2 hitos
            Hito::factory(10)->create(['id_paciente' => $paciente->id_paciente])->each(function ($hito) {
                // Para cada hito, crear 3 mediciones
                Medicion::factory(5)->create(['id_hito' => $hito->id_hito])->each(function ($medicion) {
                    // Para cada medición, crear 5 repeticiones
                    Repeticion::factory(5)->create(['id_medicion' => $medicion->id_medicion]);
                });
            });
        });
    }
}
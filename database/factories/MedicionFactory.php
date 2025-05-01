<?php

namespace Database\Factories;

use App\Models\Hito;
use Illuminate\Database\Eloquent\Factories\Factory;

class MedicionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id_hito' => Hito::factory(),
            'fecha' => fake()->date(),
            'tipo_medicion' => fake()->randomElement(['tipo1', 'tipo2', 'tipo3']),
            'metricas' => [
                'rango_movimiento' => fake()->numberBetween(0, 180),
                'fuerza' => fake()->numberBetween(0, 100),
                'dolor' => fake()->numberBetween(0, 10)
            ]
        ];
    }
} 
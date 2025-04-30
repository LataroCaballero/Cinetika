<?php

namespace Database\Factories;

use App\Models\Medicion;
use Illuminate\Database\Eloquent\Factories\Factory;

class RepeticionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id_medicion' => Medicion::factory(),
            'valores' => [
                'repeticion' => fake()->numberBetween(1, 10),
                'angulo' => fake()->numberBetween(0, 180),
                'tiempo' => fake()->numberBetween(1, 60)
            ]
        ];
    }
} 
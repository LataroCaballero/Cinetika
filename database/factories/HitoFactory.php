<?php

namespace Database\Factories;

use App\Models\Paciente;
use Illuminate\Database\Eloquent\Factories\Factory;

class HitoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id_paciente' => Paciente::factory(),
            'titulo' => fake()->sentence(),
            'descripcion' => fake()->paragraph(),
            'patologia' => fake()->randomElement(['Tendinitis', 'Artritis', 'Lumbalgia', 'Cervicalgia']),
            'fecha' => fake()->date()
        ];
    }
} 
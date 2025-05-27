<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PacienteFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre_apellido' => fake()->name(),
            'dni' => fake()->unique()->numerify('########'),
            'fecha_nac' => fake()->date(),
            'email' => fake()->randomElement([fake()->unique()->safeEmail(),null]),
            'telefono' => fake()->randomElement([fake()->phoneNumber(),null]),
            'grupo' => fake()->randomElement(['A', 'B', 'C', 'D', null])
        ];
    }
} 
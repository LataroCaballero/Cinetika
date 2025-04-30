<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Paciente extends Model
{
    use HasFactory;
    protected $table = 'pacientes';
    protected $primaryKey = 'id_paciente';

    protected $fillable = [
        'nombre_apellido',
        'dni',
        'fecha_nac',
        'email',
        'telefono',
        'grupo'
    ];

    protected $casts = [
        'fecha_nac' => 'date'
    ];

    public function hitos(): HasMany
    {
        return $this->hasMany(Hito::class, 'id_paciente');
    }
} 
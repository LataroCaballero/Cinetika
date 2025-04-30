<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hito extends Model
{
    use HasFactory;
    protected $table = 'hitos';
    protected $primaryKey = 'id_hito';

    protected $fillable = [
        'id_paciente',
        'titulo',
        'descripcion',
        'patologia',
        'fecha'
    ];

    protected $casts = [
        'fecha' => 'date'
    ];

    public function paciente(): BelongsTo
    {
        return $this->belongsTo(Paciente::class, 'id_paciente');
    }

    public function mediciones(): HasMany
    {
        return $this->hasMany(Medicion::class, 'id_hito');
    }
} 
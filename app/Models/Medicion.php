<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Medicion extends Model
{
    use HasFactory;
    protected $table = 'mediciones';
    protected $primaryKey = 'id_medicion';

    protected $fillable = [
        'id_hito',
        'fecha',
        'tipo_medicion',
        'metricas'
    ];

    protected $casts = [
        'fecha' => 'date',
        'metricas' => 'array'
    ];

    public function hito(): BelongsTo
    {
        return $this->belongsTo(Hito::class, 'id_hito');
    }

    public function repeticiones(): HasMany
    {
        return $this->hasMany(Repeticion::class, 'id_medicion');
    }
} 
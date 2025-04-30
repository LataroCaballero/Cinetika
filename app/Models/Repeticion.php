<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Repeticion extends Model
{
    use HasFactory;
    protected $table = 'repeticiones';
    protected $primaryKey = 'id_repeticion';

    protected $fillable = [
        'id_medicion',
        'valores'
    ];

    protected $casts = [
        'valores' => 'array'
    ];

    public function medicion(): BelongsTo
    {
        return $this->belongsTo(Medicion::class, 'id_medicion');
    }
} 
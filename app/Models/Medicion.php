<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use \PhpOffice\PhpSpreadsheet\Reader\Csv;

class Medicion extends Model
{
    use HasFactory;
    protected $table = 'mediciones';
    protected $primaryKey = 'id_medicion';

    protected $fillable = [
        'id_hito',
        'fecha',
        'tipo_medicion',
        'ruta_archivo_medicion'
    ];

    protected $casts = [
        'fecha' => 'date',
    ];

    public function hito(): BelongsTo
    {
        return $this->belongsTo(Hito::class, 'id_hito');
    }

    public function show(): array{
        $reader = new Csv();
        $reader->setDelimiter(',');
        $reader->setEnclosure('"');
        $spreadsheet = $reader->load($this->ruta_archivo_medicion);
        $data = [
            $this->fecha,
            $this->tipo_medicion,
            $spreadsheet->getActiveSheet()->toArray()
        ];
        return $data;
    }
} 
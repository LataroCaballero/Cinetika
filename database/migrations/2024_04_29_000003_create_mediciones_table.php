<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('mediciones', function (Blueprint $table) {
            $table->id('id_medicion');
            $table->foreignId('id_hito')->constrained('hitos', 'id_hito')->onDelete('cascade');
            $table->date('fecha');
            $table->enum('tipo_medicion', ['tipo1', 'tipo2', 'tipo3']);
            $table->string('ruta_archivo_medicion')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('mediciones');
    }
};
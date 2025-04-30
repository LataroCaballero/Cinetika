<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('repeticiones', function (Blueprint $table) {
            $table->id('id_repeticion');
            $table->unsignedBigInteger('id_medicion');
            $table->foreign('id_medicion')->references('id_medicion')->on('mediciones')->onDelete('cascade');
            $table->json('valores');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('repeticiones');
    }
}; 
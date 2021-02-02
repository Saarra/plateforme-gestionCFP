<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->string('nomFormation');
            $table->text('descriptionFormation');
            $table->string('dureeFormation');
            $table->string('prixFormation');
            $table->string('idFormateur')->nullable();
            $table->string('fichier')->nullable();
            $table->string('type')->nullable();
            $table->boolean('espaceCours')->nullable();
            $table->dateTime('dateDebut')->nullable();
            $table->dateTime('dateFin')->nullable();
        });
    }

    /** 
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('formations');
    }
}

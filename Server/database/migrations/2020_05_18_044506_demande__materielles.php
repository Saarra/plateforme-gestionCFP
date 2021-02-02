<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DemandeMaterielles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('Demande_Materielles');
        Schema::create('Demande_Materielles', function (Blueprint $table) {
            $table->id();
            $table->String('idFormateur');
            $table->String('idFormation');
            $table->String('typeSalle')->nullable();
            $table->String('idMaterial');
            $table->dateTime('dateDebut')->nullable();
            $table->dateTime('dateFin')->nullable();
            $table->string('etat')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Demande_Materielles');
    }
}

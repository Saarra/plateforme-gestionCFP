<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Cv extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('cv');
        Schema::create('cv', function (Blueprint $table) {
            $table->id();
            $table->string('designation');
            $table->string('facebook')->nullable();
            $table->string('github')->nullable();
            $table->string('linkedin')->nullable();
            $table->text('diplome')->nullable();
            $table->text('experience')->nullable();
            $table->string('idFormateur');
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
        //
    }
}

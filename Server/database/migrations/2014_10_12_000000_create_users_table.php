<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Builder;


class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

	Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('firstname');
        $table->string('cin',8)->unique()->nullable();
        $table->date('dateNais');
        $table->string('phone')->nullable();
        $table->string('adresse');
        $table->string('role')->nullable();
        $table->string('image')->nullable();
        $table->text('about')->nullable();
        $table->string('email', 250)->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->boolean('isEmbauchee')->nullable();
        $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
    
        public function boot()
        {
            Builder::defaultStringLength(191);
        }
}

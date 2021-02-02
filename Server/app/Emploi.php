<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Emploi extends Model
{
    protected $table = 'emplois';
    protected $fillable = [
        'id' ,'groupe','idFormation', 'fichier'
        ];
}

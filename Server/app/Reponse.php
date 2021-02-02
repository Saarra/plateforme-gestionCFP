<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reponse extends Model
{
    protected $table = "reponses";
    protected $fillable = [
        'id', 'idTest','idTest','idFormation','idApprenant', 'idQuestion','reponse'
    ];
}

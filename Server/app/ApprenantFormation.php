<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ApprenantFormation extends Model
{
    protected $table = 'apprenant_formation';
    protected $fillable = [
        'id' ,'idApprenant', 'idFormation', 'dateInscris'        ];
}

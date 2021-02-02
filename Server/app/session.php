<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class session extends Model
{
    protected $fillable = [
        'id' ,'idFormation', 'dateDebut', 'dateFin' ,'capacite'
        ];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    protected $table = 'formations';
    protected $fillable = [
        'id' ,'nomFormation', 'descriptionFormation', 'dureeFormation',
        'prixFormation','idFormateur','fichier','espaceCours','dateDebut','dateFin','type'
        ];
    public $timestamps = false;

}

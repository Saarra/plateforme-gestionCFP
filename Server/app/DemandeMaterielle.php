<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DemandeMaterielle extends Model
{
    protected $table = 'Demande_Materielles';
    protected $fillable = ['id'
        ,'idFormateur','idFormation','etat'
        ,'idMaterial','dateDebut','dateFin','typeSalle'
    ];
}

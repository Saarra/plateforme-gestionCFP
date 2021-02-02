<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class reclamations extends Model
{
    protected $fillable = [
        'id' ,'sujetReclamation', 'contenuReclamation','email'
        ];
}

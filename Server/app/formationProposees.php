<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class formationProposees extends Model
{
    protected $fillable = [
        'id' ,'sujetProposition', 'contenuProposition'
        ];
}

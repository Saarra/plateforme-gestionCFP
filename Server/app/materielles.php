<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class materielles extends Model
{
    protected $fillable = [
        'id' ,'nomMaterielle', 'quantite'
        ];
}

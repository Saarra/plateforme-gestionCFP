<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class question extends Model
{
    protected $fillable = [
        'id' ,'idTest','designation', 'reponse_1', 'reponse_2', 'reponse_3'
    ];
}

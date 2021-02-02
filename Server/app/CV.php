<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CV extends Model
{
    protected $table = 'cv';
    protected $fillable = [
        'id' ,'designation', 'facebook', 'github',
        'linkedin','diplome','experience','idFormateur'
    ];
}

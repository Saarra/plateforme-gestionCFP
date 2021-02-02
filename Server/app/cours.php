<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class cours extends Model
{
    protected $table = 'cours';
    protected $fillable = [
        'id' ,'nomCours', 'descCours','fichier','idFormation'
        ];
}

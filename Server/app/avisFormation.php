<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class avisFormation extends Model
{
    protected $fillable = [
        'id' ,'idFormation', 'idApprenant','note','avis'
        ];
}

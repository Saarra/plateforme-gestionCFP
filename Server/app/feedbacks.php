<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class feedbacks extends Model
{
    protected $fillable = [
        'id' ,'sujet', 'description','email','name','firstname'
        ];

}

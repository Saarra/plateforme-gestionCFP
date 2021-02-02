<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $fillable = [
        'id','codeVirement', 'idApprenant', 'montant', 'recu'
    ];
}

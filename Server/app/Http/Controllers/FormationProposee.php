<?php

namespace App\Http\Controllers;

use App\formationProposees;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class FormationProposee extends Controller
{
    /*
    afficher les formations proposee
    */
    function index():UserResource
    {
        $FormationProposse = formationProposees::all();
        return new UserResource($FormationProposse);
        return $FormationProposse;
    }

    /*
    proposer un formation
    */
    public function store(Request $request)
    {
        $FormationProposse = formationProposees::create([
            'sujetProposition' => $request->sujet,
            'contenuProposition' => $request->contenu,
        ]);
    }

    /*
    afficher les formations proposee
    */
    function delete($id):UserResource
    {
        $FormationProposse = formationProposees::destroy($id);
        return new UserResource($FormationProposse);
    }
}

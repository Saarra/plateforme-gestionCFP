<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\question;
use App\User;
use Illuminate\Support\Facades\Auth;

class questionController extends Controller
{
    public function index ()
    {
        return view('AjoutQuestion');
    }

    public function store()
    {
        $data = request()->validate(
            [
                'titre' => 'required',
                'proposition' => 'required'
            ]
            );
            $idApprenant = Auth::user()->id;
            $question = question::create([
                'idApprenant' => $idApprenant ,
                'titre' => $data['titre'],
                'proposition' => $data['proposition'], 
            ]);

    }

    public function show(question $question)
    {
        return view('questionShow', compact('question'));
    }
}

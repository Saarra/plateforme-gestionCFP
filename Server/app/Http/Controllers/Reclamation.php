<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\reclamations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Reclamation extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reclamation=reclamations::all();
        return $reclamation;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $reclamation = reclamations::create([
            'sujetReclamation' => $request->sujetReclamation,
            'contenuReclamation' => $request->contenuReclamation,
            'email' => $request->email,
            // 'email' => Auth::User()->email,
        ]);

        return $request;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id):UserResource
    {
        $Reclamation=Reclamation::find($id);
        return new UserResource($Reclamation);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        reclamations::destroy($id);
                
    }
}

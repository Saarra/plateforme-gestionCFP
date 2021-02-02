<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Paiement as AppPaiement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Paiement;

class paiementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index():UserResource
    {
        $paiement = AppPaiement::all();
        return new UserResource($paiement);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $email = Auth::User()->email;
        AppPaiement::create([
            'sujetReclamation' => $request->sujet,
            'contenuReclamation' => $request->contenu,
            'email' => $email,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id):UserResource
    {
        return new UserResource(AppPaiement::find($id));
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
        AppPaiement::destroy($id);
    }
}

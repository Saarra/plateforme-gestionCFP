<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class avisFormation extends Controller
{
    /**
     * afficher toutes les avis 
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Avis = avisFormation::all();
        return $Avis;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $User= Auth::user();
        DB::insert('insert into avisFormation (idFormation,idApprenant,note,avis) values (?,?,?,?)', [ $data->idFormation,$User->id,$data->note,$data->avis]);
        $avisFormation = avisFormation::all();        
        return $avisFormation;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Avis=avisFormation::find($id);
        return $Avis;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Avis=avisFormation::find($id);
        $Avis->destroy();
    }
}

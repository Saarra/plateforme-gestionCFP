<?php

namespace App\Http\Controllers;

use App\Formation;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;
use PDO;

class ConsulterFormation extends Controller
{
    /*
     afficher tous les formations disponibles 
     */
    public function index()
    {
        $formation = Formation::all();        
        return new $formation;
    }

    /*
    confirmation d'inscription
    */
    public function confirmer(String $id)
    {
        $User=Auth::user();
        $Formation = Formation::find($id);
        return array(($Formation), $User);
    }

    /*
    inscription dans une formation
    */
    protected function store(Request $data)
    {
        $User=Auth::user();
        $Result = DB::insert('insert into apprenant_formation (idApprenant,idFormation,dateInscris) values (?,?,?)', [ $User->id,$data->id,date_create()]);
        
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatistiqueController extends Controller
{
    public function inscriptionByFormation()
    {
        $data = DB::table('formations as f')
                    ->leftjoin('apprenant_formation as AF', 'AF.idFormation', '=', 'f.id')
                    ->select('f.id','f.nomFormation', DB::raw('count(AF.idFormation) as total'))
                     ->groupBy('f.id','f.nomFormation', 'AF.idFormation')
                    ->get();
        return $data;
    }
    public function formationsByYear(){
        $data = DB::table('formations as f')
            ->select(DB::raw('count(f.id) as total'), DB::raw('YEAR(dateDebut) year'))
            ->groupby('year')
            ->get();
        return $data;

}
}

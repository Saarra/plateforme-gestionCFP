<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Reponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReponseController extends Controller
{
public function save(Request $request, $idApprenant){
        DB::beginTransaction();
        try {
            $reponses = $request->get('questions');
            foreach ($reponses as $reponse){
                Reponse::create(array(
                    'idFormation'=>$request->get('idFormation'),
                    'idTest'=>$request->get('id'),
                    'idApprenant'=>$idApprenant,
                    'idQuestion'=>$reponse['id'],
                    'reponse'=>$reponse['selected'],
            ));
            }
            DB::commit();
            $resp['status'] = "success";
        } catch (\Exception $e){
            DB::rollBack();
            $resp['status'] = "error";
            $resp['data']= $e->getMessage();
        }
        return $resp;
    }
    public function getByTestAndApp($idTest, $idUser){
     return  DB::table('reponses as r')
                     ->join('questions as q', 'q.id','=', 'r.idQuestion')
                     ->select('r.*','q.designation as question')
                     ->where('q.idTest',$idTest)->where('r.idApprenant', $idUser)
                     ->get();
    }
}

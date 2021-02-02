<?php

namespace App\Http\Controllers;

use App\question;
use App\Reponse;
use App\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Integer;
use Reponses;
use Symfony\Component\Console\Input\Input;

class TestController extends Controller
{

    public function AjoutTest(Request $data)
    {
        $Result = DB::insert('insert into tests (idFormation,nomTest,nombreQuestion) values (?,?,?)', [1,$data->nom,$data->nombreQuestion]);
        return view('AjoutTest')->with('nombreQuestion',$data->nombreQuestion);
        
    }

    public function add(Request $data)
    {
        DB::beginTransaction();
        try {
            $questions = $data->get('questions');
            Test::create(array(
                'nomTest'=>$data->get('nomTest'),
                'idFormation'=>$data->get('idFormation'),
                'nombreQuestion'=>sizeof($questions)
            ));
            $id =  DB::getPdo()->lastInsertId();;
            foreach ($questions as $question){
                question::create(array(
                    'idTest'=> $id,
                    'designation'=> $question['designation'],
                    'reponse_1'=> $question['reponse_1'],
                    'reponse_2'=> $question['reponse_2'],
                    'reponse_3'=> $question['reponse_3'],
                ));
            }
            DB::commit();
            $resp['status'] = "success";
        }catch (\Exception $e){
            DB::rollBack();
            $resp['status'] = "error";
            $resp['data'] = $e->getMessage();
        }
        return $resp;
    }

    function getTest($id)
    {
        $Test= DB::select('select * from tests where idFormation=? ',[$id]);
        // $idTest=$Test['idTest'];
        $Question = DB::select('select * from questions where idTest = ?', [$id]);
        foreach ($Question as $Quest ){
            for( $i=1; $i<3 ; $i++)
            {

            $Reponse = DB::select('select * from reponses where idQuestion = ?', [$i]);

            }
        }
        return [$Test,$Question,$Reponse];
    }
    public function getByApprenant($id){

        $formations = DB::table('formations as f')
            ->join('users as u', 'u.id','=','f.idFormateur')
            ->join('apprenant_formation as AF','AF.idFormation','=','f.id')
            ->join('users as u1', 'u1.id','=','AF.idApprenant')
            ->join('tests as t','t.idFormation','=','f.id')
            ->select('t.*', 'u.name as formateur','f.nomFormation')
            ->where('u1.id', '=', $id)
            ->get();

        return $formations;
    }
    public function getByFormation($id){

        $formations = DB::table('tests as t')
                        ->select('t.*')
                        ->where('t.idFormation', '=', $id)
                        ->get();

        return $formations;
    }
    public function testPassed($idTest, $idUser){
        $data = Reponse::where('idTest',$idTest)->where('idApprenant',$idUser)->get();
        return sizeof($data)==0?"false":"true";
    }
    public function getByID($id){
        $test = Test::where('id',$id)->get();
        $questions = question::where('idTest', $id)->get();
        foreach ($questions as $question){
            $question->selected = null;
        }
        $test[0]->questions = $questions;
        return $test;
    }
    
}

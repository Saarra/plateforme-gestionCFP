<?php

namespace App\Http\Controllers;

use App\CV;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CVController extends Controller
{
    public function save(Request $request)
    {
        CV::create(array(
            'designation' => $request->get('designation'),
            'facebook' => $request->get('facebook'),
            'linkedin' => $request->get('linkedin'),
            'github' => $request->get('github'),
            'diplome' => $request->get('diplome'),
            'experience' => $request->get('experience'),
            'idFormateur' => $request->get('idFormateur')
        ));
        return "true";
    }
    public function edit(Request $request, $id)
    {
        CV::find($id)->update(array(
            'designation' => $request->get('designation'),
            'facebook' => $request->get('facebook'),
            'linkedin' => $request->get('linkedin'),
            'github' => $request->get('github'),
            'diplome' => $request->get('diplome'),
            'experience' => $request->get('experience'),
            'idFormateur' => $request->get('idFormateur')
        ));
        return "true";
    }

    public function getAll()
    {
      $cv = DB::table('cv as c')
            ->join('users as u','u.id','=', 'c.idFormateur')
            //->leftJoin('formations as f', 'f.idFormateur','=','c.idFormateur')
            ->select('c.*', 'u.firstname', 'u.name', 'u.cin','u.email','u.adresse','u.image',
                             'u.about','u.phone', 'dateNais', 'isEmbauchee')
            ->get();
      return $cv;

    }
    public function embauchees()
    {
      $cv = DB::table('cv as c')
            ->join('users as u','u.id','=', 'c.idFormateur')
            //->leftJoin('formations as f', 'f.idFormateur','=','c.idFormateur')
            ->select('c.*', 'u.firstname', 'u.name', 'u.cin','u.email','u.adresse','u.image',
                             'u.about','u.phone', 'dateNais', 'isEmbauchee')
           ->where('u.isEmbauchee' , '=', '1')
          ->get();
      return $cv;

    }
    public function embauchee($idFormateur){
        DB::beginTransaction();
        try {
            $user = User::find($idFormateur);
            if($user->isEmbauchee == true){
                DB::rollBack();
                $resp['status']= 'exist';
                $resp['data']= $user;
            }
            $user->update(array('isEmbauchee'=> true));
            DB::commit();
            $resp['status']= 'success';
            $resp['data']= $user;
        }catch (\Exception $e){
            DB::rollBack();
            $resp['status']= 'error';
            $resp['data']= $e->getMessage();
        }
        return $resp;

    }
    public function getByFormateur($id){
        return CV::where('idFormateur', $id)->get();
    }
}

<?php

namespace App\Http\Controllers;

use App\ApprenantFormation;
use App\Formation;
use App\Role;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Formations;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;


class FormationController extends Controller
{
    /*
    afficher tous les formations
    */
    public function index()
    {
        $formation = DB::table('formations as f')->select('f.*', 'u.name as formateur')
                                ->leftjoin('users as u','u.id','=','f.idformateur')
                                ->get();
        return $formation;
    }
    public function getByID($id){
        $formation = DB::table('formations as f')->select('f.*', 'u.name as formateur')
            ->leftjoin('users as u','u.id','=','f.idformateur')
            ->where('f.id', $id)
            ->get();
        return $formation;
    }


    /**
     *
     * @param  array  $data
     * @return string
     */
    protected function store(Request $request)
    {
        $fichierName=null;
        $fichier= $request->get('fichier');
        date_default_timezone_set('Africa/Tunis');
        $current_date_time = Carbon::now()->toDateTimeString(); // Produces something like "2019-03-11 12:25:00"
        $current_timestamp = Carbon::now()->timestamp;
        if (sizeof($fichier)!== 0) {
            $aa=explode(';', $fichier[0]['file']);
            $aa1=explode('/', $aa[0]);
            $extension=$aa1[1];
            $fichier = str_replace('data:image/'.$extension.';base64,', '', $fichier);
            $fichier = str_replace(' ', '+', $fichier);
            $fichierName =$fichier[0]['name'].$current_timestamp . '.' . $extension;
            if (strpos($fichier[0]['file'], ',') !== false)
            {
                @list($encode, $fichier[0]['file']) = explode(',', $fichier[0]['file']);
            }

            \File::put(public_path() . '/data/formations/'.$fichierName, base64_decode($fichier[0]['file']));
        }
        $data = array(
            'nomFormation'=> $request->get('nomFormation'),
            'descriptionFormation'=>$request->get('descriptionFormation'),
            'dureeFormation'=>$request->get('dureeFormation'),
            'prixFormation'=>$request->get('prixFormation'),
            'idFormateur'=>$request->get('idFormateur'),
            'fichier'=>$fichierName,
            'espaceCours'=>$request->get('espaceCours'),
            'dateDebut'=>$request->get('dateDebut'),
            'dateFin'=>$request->get('dateFin'),
        );
        Formation::create($data);
        return 'true';
    }


    /*
    supprimer un formation
    */
    public function delete($id)
    {
        return Formation::find($id)->delete();

    }

    /*
     afficher le formulaire pour modifier un formation
    */
    public function edit($id):UserResource
    {
        $formation= Formation::find($id);
        
        return new UserResource($formation);
    }

    public function update(Request $request, $id)
    {

        $fichierName=null;
        $fichier= $request->get('fichier');
        $formation = Formation::find($id);
        date_default_timezone_set('Africa/Tunis');
        $current_date_time = Carbon::now()->toDateTimeString(); // Produces something like "2019-03-11 12:25:00"
        $current_timestamp = Carbon::now()->timestamp;
        if (sizeof($fichier)!== 0) {
            $aa=explode(';', $fichier[0]['file']);
            $aa1=explode('/', $aa[0]);
            $extension=$aa1[1];
            $fichier = str_replace('data:image/'.$extension.';base64,', '', $fichier);
            $fichier = str_replace(' ', '+', $fichier);
            $fichierName =$fichier[0]['name'].$current_timestamp . '.' . $extension;
            if (strpos($fichier[0]['file'], ',') !== false)
            {
                @list($encode, $fichier[0]['file']) = explode(',', $fichier[0]['file']);
            }

            \File::put(public_path() . '/data/formations/'.$fichierName, base64_decode($fichier[0]['file']));
        }
        $data = array(
            'nomFormation'=> $request->get('nomFormation'),
            'descriptionFormation'=>$request->get('descriptionFormation'),
            'dureeFormation'=>$request->get('dureeFormation'),
            'prixFormation'=>$request->get('prixFormation'),
            'idFormateur'=>$request->get('idFormateur'),
            'fichier'=>sizeof($request->get('fichier'))!== 0?$fichierName:$formation->fichier,
            'espaceCours'=>$request->get('espaceCours'),
            'dateDebut'=>$request->get('dateDebut'),
            'dateFin'=>$request->get('dateFin'),
        );
        $formation->update($data);
        return 'true';

    }
    public function inscription(Request $request){
        $idUSer= $request->get('idUser');
        $idFormation = $request->get('idFormation');
        $userIscrit = ApprenantFormation::where('idApprenant',$idUSer)->where('idFormation', $idFormation)->get();
        if(sizeof($userIscrit)!=0){
            return false;
        }
        $data = array(
            'idFormation'=>$idFormation,
            'idApprenant'=> $idUSer,
            //'dateInscris'=> date('d/m/Y H:i'),
            'dateInscris'=> date('Y-m-d h:i:s'),
        );
        ApprenantFormation::create($data);
        return "true";
    }
    public function getByFormateur(){
        $user= Auth::user();
        $role = Role::find($user->role);
        $formations = Formation::when($role->code=='formateur', function ($query)use ($user){
            return $query->where('idFormateur', $user->id);
        })
            ->get();
        return $formations;

    }
    public function getByApprenant($id){

        $formations = DB::table('formations as f')
                            ->join('users as u', 'u.id','=','f.idFormateur')
                            ->join('apprenant_formation as AF','AF.idFormation','=','f.id')
                            ->join('users as u1', 'u1.id','=','AF.idApprenant')
                           //->leftjoin('tests as t','t.idFormation','=','f.id')
                            ->select('f.*', 'u.name as formateur')
                            ->where('u1.id', '=', $id)
                            ->get();

        return $formations;

    }


}

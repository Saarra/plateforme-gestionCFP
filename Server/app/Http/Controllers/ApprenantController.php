<?php

namespace App\Http\Controllers;

use App\ApprenantFormation;
use App\Http\Resources\UserResource;
use App\Role;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class ApprenantController extends Controller
{
    /*
    afficher tous les Apprenants
    */
    function index()
    {
        $User = DB::table('users as u')
            ->leftjoin('roles as r','r.id','=','u.role')
            ->where('r.code','apprenant')
            ->select('u.*', 'r.designation as roleDesignation')->get();
        return $User;
    }
    public function getApprenantByFormation($id){
        $data = DB::table('apprenant_formation as f')
                    ->leftjoin('users as u','u.id','=', 'f.idApprenant')
                    ->select('u.*', 'f.id as idIsncription')->where('f.idFormation','=', $id)->get();
        return $data;
    }
    public function inscriptionCancel($id){
        ApprenantFormation::find($id)->delete();
        return "true";
    }


    /*
    afficher le profile de Apprenant
    */
    public function show($id)
    {
        $user = user::find($id);
        return $user;    
    }



    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'dateNais' => ['required', 'date', 'max:255'],
            'cin' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => [ 'string', 'max:255'],
        ]);
    }

    
    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return "true"
     */
    protected function store(Request $request)
    {
        $veriEmail= User::where('email',$request->get('email'))->get();
        if(sizeof($veriEmail) != 0){
            return "false";
        }
        $nom=$request['name'];
        $prenom=$request['firstname'];
        $cin=$request['cin'];
        $dateNais=$request['dateNais'];
        $adresse=$request['adresse'];
        $email=$request['email'];
        $password=Hash::make($request['password']);
        $role=Role::where('code','apprenant')->get();
        $data = array(
            'name'=>$request->get('name'),
            'firstname'=>$request->get('firstname'),
            'adresse'=>$request->get('adresse'),
            'email'=>$request->get('email'),
            'password'=>Hash::make($request['password']),
            'dateNais'=> $request->get('dateNais'),
            'role'=> $role!==[]?$role[0]->id:null,
        );
         User::create($data);
        return "true";
    }

    /* 
    afficher le formulaire pour modifier un Apprenant
    */
    public function edit($id)
    {
        $user=User::find($id);
        return $user;
    }
    
     /*
    mettre a jour un Apprenant
    */
    public function Update(Request $request, $id)
    {    
        $user = User::findOrFail($id);
        $veriEmail= User::where('email',$request->email)->where('id','<>',$id)->get();

        if(sizeof($veriEmail) != 0){
            return "false";
        }
        $changePassWord= $request->password!=$user->password;
        $user->name = $request->name;
        $user->firstname= $request->firstname;
        $user->dateNais= $request->dateNais;
        $user->adresse= $request->adresse;
        $user->cin= $request->cin;
        $user->email= $request->email;
        $user->password= $changePassWord?$request->password: $user->password;
        $user->update();
        return "true";
    }

    /*
    supprimer un Apprenant
    */
    public function delete($id)
    {
        $user=User::find($id);
        $user->delete();
    }    

}


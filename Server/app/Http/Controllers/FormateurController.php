<?php

namespace App\Http\Controllers;

use App\Helpers\DatabaseConnection;
use App\Http\Resources\UserResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class FormateurController extends Controller
{
    /*
    afficher tous les formateurs
    */
    function index()
    {
        $User = DB::table('users as u')
                    ->leftjoin('roles as r','r.id','=','u.role')
                     ->where('r.code','formateur')
                     ->select('u.*', 'r.designation as roleDesignation')->get();
        return $User;
    }


    /*
    afficher le profile de formateur
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
     * @param  string  true
     * @return string
     */
    protected function store(Request $request)
    {

        date_default_timezone_set('Africa/Tunis');
        $current_date_time = Carbon::now()->toDateTimeString(); // Produces something like "2019-03-11 12:25:00"
        $current_timestamp = Carbon::now()->timestamp; // Produces something like 1552296328
        $imageName=null;
        $image= $request->get('image');
        if ($image!==null) {
            $aa=explode(';', $image);
            $aa1=explode('/', $aa[0]);
            $extension=$aa1[1];
            $image = str_replace('data:image/'.$extension.';base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName =$current_timestamp . '.' . $extension;


            /*if (\File::exists(public_path() . '\PieceFile' . $imageName)) {
                \File::delete(public_path() . '\PieceFile/' . $imageName);
            }*/

            \File::put(public_path() . '/data/'.''. $imageName.$request['name'], base64_decode($image));
        }
        $user = array(
            'name'=>$request['name'],
            'firstname'=>$request['firstname'],
            //'cin'=>strval($request['cin']),
            'dateNais'=>$request['dateNais'],
            'adresse'=>$request['adresse'],
            'email'=>$request['email'],
            'image'=>$imageName.$request['name'],
            'password'=>Hash::make($request['password']),
            'role'=>$request['role']
            );
        User::create($user);
       // $user = DB::insert('insert into users (name,firstname, dateNais , cin, email , adresse, password,role ) values(?,?,?,?,?,?,?,?)' , [ $nom , $prenom , $dateNais , $cin , $email ,$adresse , $password ,$role ]);

        return "true";
    }

    /* 
    afficher le formulaire pour modifier un formateur
    */
    public function edit($id)
    {
        $user=User::find($id);
        return $user;
    }
    
     /*
    mettre a jour un formateur
    */
    public function Update(Request $request, $id)
    {    
        $user = User::find($id);
        $user->name = $request->name;
        $user->firstname= $request->firstname;
        $user->dateNais= $request->dateNais;
        $user->adresse= $request->adresse;
        $user->cin= $request->cin;
        $user->email= $request->email;
        //$user->password= $request->password;
        $user->role= $request->get('role');
        $user->update();
        return $user;  
    }

    /*
    supprimer un formateur
    */
    public function delete($id)
    {
        $user=User::find($id);
        $user->delete();
    }    

}


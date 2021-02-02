<?php

namespace App\Http\Controllers;

use App\Role;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use App\User;


class AuthController extends Controller {

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Either email or password is wrong.'], 401);
        }

        return $this->createNewToken($token);
        
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
    */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'firstname' => ['required', 'string', 'max:255'],
            'cin' => ['required', 'string', 'max:255', 'unique:users'],
            'dateNais' => ['required', 'date', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'adresse' => ['required', 'string', 'max:255'],
            'role' => [ 'string', 'max:255'],
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
                ));

        return response()->json([
            'message' => 'le compte enregistré avec succès',
            'user' => $user
        ], 201);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        $user = auth()->user();
        $role= Role::select('designation','code')->where('id', $user->role)->get();
        $user['roleDesignation'] = $role[0]->designation;
        $user['codeRole'] = $role[0]->code;
        return response()->json($user);
    }
    public function updateProfile(Request $request, $id)
    {
        date_default_timezone_set('Africa/Tunis');
        $current_date_time = Carbon::now()->toDateTimeString(); // Produces something like "2019-03-11 12:25:00"
        $current_timestamp = Carbon::now()->timestamp; // Produces something like 1552296328
        $imageName=null;
        $image= $request->get('image');
        $user = User::find($id);
        if ($image!==null && $image!== $user->image) {
            $aa=explode(';', $image);
            $aa1=explode('/', $aa[0]);
            $extension=$aa1[1];
            $image = str_replace('data:image/'.$extension.';base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName =$current_timestamp . '.' . $extension;


            \File::put(public_path() . '/data/images/'.''.$request['name'].$imageName, base64_decode($image));
        }
        $user->name = $request->name;
        $user->firstname= $request->firstname;
        $user->dateNais= $request->dateNais;
        $user->adresse= $request->adresse;
        $user->cin= $request->cin;
        $user->phone= $request->phone;
        $user->email= $request->email;
        $user->about= $request->about;
        $user->image = $image!=null?$request['name'].$imageName: null;
        //$user->password= $request->password;
        $user->role= $request->get('role');
        $user->update();
        return $user;
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
            'role' => auth()->user()->role,
            'cin' => auth()->user()->cin,
        ]);
    }

}

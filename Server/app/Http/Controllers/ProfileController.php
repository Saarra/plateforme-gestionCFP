<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Session;
use DB;
class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        return (view('profile')->with('user',Auth::user()));
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function Update(Request $request)
    {
        $this->validate($request,[
            'nom' => 'required',
            'prenom' => 'required',
            'DateNais' => 'required',
            'cin' => 'required',
            'email' => 'required|email',
            'password' => '',
        ]);

        $user = Auth::user();
        
        $user->nom = $request->nom;
        $user->prenom = $request->prenom;
        $user->DateNais = $request->DateNais;
        $user->cin = $request->cin;
        $user->email = $request->email;
    

        if ($request ->has('password'))
            {
                $user->password = $request->Hash::make($user['password']);
            }
        
        $user->save();

        
        //Session::flash('success', 'Profile Updated');        
    }

}

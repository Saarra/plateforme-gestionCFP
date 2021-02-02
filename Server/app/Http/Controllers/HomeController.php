<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user=Auth::User();
        if ($user->role="apprenant")
            return view('ApprenantDashboard');
        elseif($user->role="formateur")
            return view('FormateurDashboard');
        elseif ($user->role="admin")
            return view('AdminDashboard');
    }
        
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    
}

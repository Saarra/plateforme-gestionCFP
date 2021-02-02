<?php

namespace App\Http\Controllers;

use App\feedbacks;
use Illuminate\Http\Request;

class feedbackController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $feedback=feedbacks::all();
        return $feedback;
    }

    public function store(Request $request)
    {
        $feedback = feedbacks::create([
            'sujet' => $request->sujet,
            'description' => $request->description,
            'name' => $request->name,
            'firstname' =>$request->firstname,
            'email' => $request->email,
            // 'email' => Auth::User()->email,
        ]);

        return $request;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $feedback=feedbacks::find($id);
        $feedback->delete();
    }

}

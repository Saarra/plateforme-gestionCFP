<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function getAll(){
        return Material::all();
     }
     public function add(Request $request){
        Material::create(array(
            'designation'=> $request->get('designation'),
            'description'=>$request->get('description'),
        ));
        return "true";
     }
     public function edit(Request $request){
        $id = $request->get('id');
         Material::where($id)->update(array(
             'designation'=> $request->get('designation'),
             'description'=>$request->get('description'),
         ));
         return "true";
     }
    public function delete($id){
        return Material::where($id)->delete();
    }
}

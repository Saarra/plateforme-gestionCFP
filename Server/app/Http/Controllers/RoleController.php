<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Role as Role;
use App\User as User;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
   public function getAll(){
       return Role::all();
   }
   public function getWithOutAdmin(){
       return Role::where('code','<>','admin')->select('*')->get();
   }
   public function addPost(Request $request){
       $data =array(
           'code'=>$request->input('code'),
           'designation'=>$request->input('designation')
       );
       Role::create($data);
       return "true";
   }
   public function editPost(Request $request, $id){
       $id=$request->get('id');
       $data =array(
           'code'=>$request->input('code'),
           'designation'=>$request->input('designation')
       );
       Role::find($id)->update($data);
       return "true";
   }
   public function delete($id){
       DB::beginTransaction();
       try {
           $users= User::where('role',$id)->get();
           if(sizeof($users)!==0){
               DB::rollback();
               $resp["status"] = "roleUsed";
               return $resp;
           }
           Role::find($id)->dalete($id);
           DB::commit();
           $resp["status"] = "success";
           return $resp;
       } catch (\Exception $e) {
           DB::rollback();
           $resp["status"] = "error";
           $resp["message"] = $e->errorInfo[2];
           return $resp;
       }
   }
}

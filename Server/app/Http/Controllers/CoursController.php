<?php

namespace App\Http\Controllers;

use App\cours;
use App\Role;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Facade\FlareClient\Stacktrace\File;
use Symfony\Component\Console\Input\Input;


class CoursController extends Controller
{

    /**
     * afficher tous les cours
     */
    function index()
    {
        $user = Auth::user();
        $role = Role::find($user->role);

        $Cours = DB::table('cours as c')
            ->join('formations as f', 'f.id', '=', 'c.idFormation')
            ->select('c.*', 'f.nomFormation as nomFormation')
            ->when($role->code == 'formateur', function ($query) use ($user) {
                return $query->where('f.idFormateur', $user->id);
            })
            ->get();
        return $Cours;
    }


    private $file;

    /*
    ajouter un cours
    */

    protected function store(Request $data)
    {
        //$filename=$data->file('fichier')->getClientOriginalName();
        // $path = $data->file('fichier')->storeAs('\fichier\cours',$filename);
        //$Result = DB::insert('insert into cours (nomCours,descCours,fichier, idFormation) values (?,?,?)', [ $data->nom,$data->desc,$filename,$data->idForm]);
        $fichier = null;
        date_default_timezone_set('Africa/Tunis');
        $current_date_time = Carbon::now()->toDateTimeString(); // Produces something like "2019-03-11 12:25:00"
        $current_timestamp = Carbon::now()->timestamp;
        $fichierName=null;
        if ($data->get('fichier') != null) {
            $fichier = $data->get('fichier') ;
            $aa=explode(';', $fichier);
            $aa1=explode('/', $aa[0]);
            $extension=$aa1[1];
            $file = str_replace('data:image/'.$extension.';base64,', '', $fichier);
            $file = str_replace(' ', '+', $file);
            $fichierName =$current_timestamp . '.' . $extension;
            if (strpos($fichier, ',') !== false)
            {
                @list($encode, $fichier) = explode(',', $fichier);
            }

            \File::put(public_path() . '/data/cours/'.$fichierName, base64_decode($fichier));


        }
        cours::create(array(
            'nomCours' => $data->get('nomCours'),
            'descCours' => $data->get('descCours'),
            'fichier' => $fichierName,
            'idFormation' => $data->get('idFormation')
        ));
        return "true";
    }

    /*
    *
    supprimer un cours
    */

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $cour = cours::find($id);
            $cour->delete();

            if (\File::exists(public_path() . '/data/cours/' .$cour->fichier)) {
                \File::delete(public_path() . '/data/cours/' . $cour->fichier);
            }
            DB::commit();
            $resp["status"] = "success";
        } catch (\Exception $e) {
            DB::rollback();
            $resp["status"] = "error";
            $resp["data"] = $e->getMessage();
        }
        return $resp;
    }

    /*
    afficher un cours pour le modifier
        **/
    public
    function edit(Request $data)
    {
            }
    function getByID($id)
    {
        $Cours = cours::find($id);
        return $Cours;
    }
    function getByFormation($id)
    {
        $Cours = cours::where('idformation',$id)->get();
        return $Cours;
    }

    /*
    mise a jour d'un cours
    */
    public
    function update(Request $data)
    {
        $id= $data->get('id');
        $cour = cours::find($id);
        date_default_timezone_set('Africa/Tunis');
        $current_date_time = Carbon::now()->toDateTimeString(); // Produces something like "2019-03-11 12:25:00"
        $current_timestamp = Carbon::now()->timestamp;
        $fichierName=null;
        if ($data->get('fichier') != null && $data->get('fichier')!=$cour->fichier) {
            $fichier = $data->get('fichier') ;
            $aa=explode(';', $fichier);
            $aa1=explode('/', $aa[0]);
            $extension=$aa1[1];
            $file = str_replace('data:image/'.$extension.';base64,', '', $fichier);
            $file = str_replace(' ', '+', $file);
            $fichierName =$current_timestamp . '.' . $extension;
            if (strpos($fichier, ',') !== false)
            {
                @list($encode, $fichier) = explode(',', $fichier);
            }
            \File::put(public_path() . '/data/cours/'.$fichierName, base64_decode($fichier));
            if (\File::exists(public_path() . '/data/cours/' .$cour->fichier)) {
                \File::delete(public_path() . '/data/cours/' . $cour->fichier);
            }
        }
        $cour->update(array(
            'nomCours' => $data->get('nomCours'),
            'descCours' => $data->get('descCours'),
            'fichier' => $fichierName!=null?$fichierName:$cour->fichier,
            'idFormation' => $data->get('idFormation')
        ));
        return "true";
    }
}

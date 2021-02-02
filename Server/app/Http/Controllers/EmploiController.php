<?php

namespace App\Http\Controllers;

use App\Emploi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Facade\FlareClient\Stacktrace\File;
use Illuminate\Support\Facades\Validator;


class EmploiController extends Controller
{
    function index()
    {
        $Emploi = DB::table('emplois as e')
            ->leftjoin('formations as f', 'f.id', '=', 'e.idformation')
            ->select('e.*', 'f.nomFormation as formation')
            ->orderby('e.created_at', 'desc')
            ->get();
        return $Emploi;
    }

    private $file;


    protected function store(Request $data)
    {
        $fichier = null;
        date_default_timezone_set('Africa/Tunis');
        $current_date_time = Carbon::now()->toDateTimeString(); // Produces something like "2019-03-11 12:25:00"
        $current_timestamp = Carbon::now()->timestamp;
        $fichierName = null;
        if ($data->get('fichier') != null) {
            $fichier = $data->get('fichier');
            $aa = explode(';', $fichier);
            $aa1 = explode('/', $aa[0]);
            $extension = $aa1[1];
            $file = str_replace('data:image/' . $extension . ';base64,', '', $fichier);
            $file = str_replace(' ', '+', $file);
            $fichierName = $data->get('groupe') .'_'. $current_timestamp . '.' . $extension;
            if (strpos($fichier, ',') !== false) {
                @list($encode, $fichier) = explode(',', $fichier);
            }
            \File::put(public_path() . '/data/emplois/' . $fichierName, base64_decode($fichier));


        }
        Emploi::create(array(
            'groupe' => $data->get('groupe'),
            'idFormation' => $data->get('idFormation'),
            'fichier' => $fichierName
        ));
        return "true";
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
                $emploi= Emploi::find($id);
                if (\File::exists(public_path() . '/data/emplois/' .$emploi->fichier)) {
                    \File::delete(public_path() . '/data/emplois/' . $emploi->fichier);
                }
                $emploi->delete();
                DB::commit();
                $resp["status"] = "success";
            } catch (\Exception $e) {
                DB::rollback();
                $resp["status"] = "error";
                $resp["data"] = $e->getMessage();
            }
        return $resp;

    }

    public function getByID($id)
    {
        return Emploi::find($id);
    }

    public function edit(Request $data)
    {
        date_default_timezone_set('Africa/Tunis');

        $emploi = Emploi::find($data->id);
        $current_date_time = Carbon::now()->toDateTimeString(); // Produces something like "2019-03-11 12:25:00"
        $current_timestamp = Carbon::now()->timestamp;
        $fichierName = null;
        if ($data->get('fichier') != null && $data->get('fichier')!=$emploi->fichier) {
            $fichier = $data->get('fichier');
            $aa = explode(';', $fichier);
            $aa1 = explode('/', $aa[0]);
            $extension = $aa1[1];
            $file = str_replace('data:image/' . $extension . ';base64,', '', $fichier);
            $file = str_replace(' ', '+', $file);
            $fichierName = $data->get('groupe') .'_'. $current_timestamp . '.' . $extension;
            if (strpos($fichier, ',') !== false) {
                @list($encode, $fichier) = explode(',', $fichier);
            }
            \File::put(public_path() . '/data/emplois/' . $fichierName, base64_decode($fichier));
            if (\File::exists(public_path() . '/data/emplois/' .$emploi->fichier)) {
                \File::delete(public_path() . '/data/emplois/' . $emploi->fichier);
            }
        }
        $emploi->update(array(
            'idFormation' => $data->get('idFormation'),
            'groupe' => $data->get('groupe'),
            'fichier' => $fichierName!=null?$fichierName:$emploi->fichier,
        ));
        return "true";

    }
}

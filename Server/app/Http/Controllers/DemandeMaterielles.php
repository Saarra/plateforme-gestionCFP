<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\DemandeMaterielle;


class DemandeMaterielles extends Controller
{

    /**
     * afficher tous les demandes de reservation de materielle
     */
    protected function index(Request $data)
    {
        $DemandeMaterielle = DemandeMaterielle::all();
        return $DemandeMaterielle;
    }

    public function getByID($id)
    {
        return DemandeMaterielle::find($id);
    }

    public function getAll()
    {
        $user = Auth::user();
        $role = Role::find($user->role);
        $formations = DB::table('Demande_Materielles as DM')
            ->join('formations as f', 'f.id', '=', 'DM.idFormation')
            ->join('materials as m', 'm.id', '=', 'DM.idMaterial')
            ->join('users as u', 'u.id', '=', 'DM.idFormateur')
            ->select('DM.*', 'f.nomFormation as formation', 'm.designation as material', 'u.name as formateur')
            ->when($role->code == 'formateur', function ($query) use ($user) {
                return $query->where('DM.idFormateur', $user->id);
            })
            ->get();
        return $formations;
    }


    /* creer un demande de reservation de materielle 
    */
    protected function store(Request $data)
    {
        $idFormateur = Auth::id();
        DemandeMaterielle::create(array(
            'idFormateur' => $idFormateur,
            'idFormation' => $data->get('idFormation'),
            'idMaterial' => $data->get('idMaterial'),
            'etat' => $data->get('etat'),
            'dateDebut' => $data->get('dateDebut'),
            'dateFin' => $data->get('dateFin')
        ));
        return "true";
    }

    protected function edit(Request $data)
    {
        DB::transactionLevel();
        try {
            $id = $data->input('id');
            $user = Auth::user();
            $role = Role::find($user->role);
            $reservation = DemandeMaterielle::find($id);
            if ($reservation->etat === "Traiter" && $role->code !="admin") {
                DB::rollback();
                $resp["status"] = "Traiter";
                return $resp;
            }
            $reservation->update(array(
                'idFormation' => $data->get('idFormation'),
                'idMaterial' => $data->get('idMaterial'),
                'etat' => $data->get('etat'),
                'dateDebut' => $data->get('dateDebut'),
                'dateFin' => $data->get('dateFin')
            ));
            DB::commit();
            $resp["status"] = "success";
            return $resp;
        } catch (\Exception $e) {
            $resp["status"] = "error";
            $resp["data"] = $e->getMessage();
            return $resp;
        }
    }

    public function delete($id)
    {
        DB::transactionLevel();
        try {
            $user = Auth::user();
            $role = Role::find($user->role);
            $reservation = DemandeMaterielle::find($id);
            if ($reservation->etat === "Traiter" && $role->code !="admin") {
                DB::rollback();
                $resp["status"] = "Traiter";
                return $resp;
            }
            $reservation->delete();
            DB::commit();
            $resp["status"] = "success";
            return $resp;
        } catch (\Exception $e) {
            $resp["status"] = "error";
            $resp["data"] = $e->getMessage();
            return $resp;
        }
    }


}

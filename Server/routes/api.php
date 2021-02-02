<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('user-profile', 'AuthController@userProfile');
    Route::post('update-profile/{id}', 'AuthController@updateProfile');
    //api formations
    Route::group(array('prefix' => 'formations/'), function () {
        Route::get('getByFormateur', 'FormationController@getByFormateur');
        Route::get('getByApprenant/{id}', 'FormationController@getByApprenant');
    });
    Route::group(array('prefix' => 'cours/'), function () {
        Route::post('add', 'CoursController@store');
        Route::get('', 'CoursController@index');
        Route::get('delete/{id}', 'CoursController@delete');
        Route::get('/GestionCours{id}', 'CoursController@edit');
        Route::get('/getByID/{id}', 'CoursController@getByID');
        Route::get('/getByFormation/{id}', 'CoursController@getByFormation');
        Route::post('/update', 'CoursController@update');
    });
    Route::group(array('prefix' => 'emplois'), function () {
        Route::post('/add', 'EmploiController@store');
        Route::get('/', 'EmploiController@index');
        Route::get('/getByID/{id}', 'EmploiController@getByID');
        Route::get('/getByFormation', 'EmploiController@getByFormation');
        Route::get('/delete/{id}', 'EmploiController@delete');
        Route::post('/edit/{id}', 'EmploiController@edit');
        Route::get('/update', 'EmploiController@update');
    });
    // Reservation
    Route::group(array('prefix' => 'DemanderMaterielle/'), function () {
        Route::post('add', 'DemandeMaterielles@store');
        Route::post('edit', 'DemandeMaterielles@edit');
        Route::get('', 'DemandeMaterielles@getAll');
        Route::get('delete/{id}', 'DemandeMaterielles@delete');
        Route::get('getByID/{id}', 'DemandeMaterielles@getByID');
    });
    // Material
    Route::group(array('prefix' => 'materials/'), function () {
        Route::post('add', 'MaterialController@add');
        Route::post('edit', 'MaterialController@edit');
        Route::get('delete/{id}', 'MaterialController@delete');
        Route::get('', 'MaterialController@getAll');
    });
    Route::get('/getApprenantByFormation/{id}', 'ApprenantController@getApprenantByFormation');
    Route::get('/inscriptionCancel/{id}', 'ApprenantController@inscriptionCancel');
    // CV
    Route::group(array('prefix' => 'cv/'), function () {
        Route::post('save', 'CVController@save');
        Route::post('edit/{id}', 'CVController@edit');
        Route::get('embauchee/{idFormateur}', 'CVController@embauchee');
        Route::get('', 'CVController@getAll');
        Route::get('embauchees', 'CVController@embauchees');
        Route::get('getByFormateur/{id}', 'CVController@getByFormateur');
    });
    // Test
    Route::group(array('prefix' => 'tests/'), function () {
        Route::post('add', 'TestController@add');
        Route::post('edit/{id}', 'TestController@edit');
        Route::get('embauchee/{idFormateur}', 'CVController@embauchee');
        Route::get('', 'TestController@getAll');
        Route::get('getByID/{id}', 'TestController@getByID');
        Route::get('getByFormation/{id}', 'TestController@getByFormation');
        Route::get('getByApprenant/{id}', 'TestController@getByApprenant');
        Route::get('testPassed/{idTest}/{idUser}', 'TestController@testPassed');
        Route::get('delete/{id}', 'TestController@delete');
    });
    // Test Reponse
    Route::group(array('prefix' => 'reponses/'), function () {
        Route::post('save/{idApprenant}', 'ReponseController@save');
        Route::get('getByTestAndApp/{idTest}/{idUser}', 'ReponseController@getByTestAndApp');
    });
    // Statistique
    Route::group(array('prefix' => 'statistiques/'), function () {
        Route::get('inscriptionByFormation', 'StatistiqueController@inscriptionByFormation');
        Route::get('formationsByYear', 'StatistiqueController@formationsByYear');
    });
});

Route::post('register', 'AuthController@register');

// roles 
Route::group(array('prefix' => 'roles'), function () {
    Route::get('/', 'RoleController@getAll');
    Route::get('getWithOutAdmin/', 'RoleController@getWithOutAdmin');
    Route::get('getWithOutAdmin/', 'RoleController@getWithOutAdmin');
    Route::get('/getByID/{id}', 'RoleController@getByID');
    Route::post('/addPost', 'RoleController@addPost');
    Route::post('/editPost/{id}', 'RoleController@editPost');
    Route::delete('delete/{id}', 'RoleController@delete');
});

//  CRUD Apprenant
Route::post('/AjoutApprenant', 'ApprenantController@store');
Route::get('/ListApprenant', 'ApprenantController@index');
Route::delete('/ApprenantSupprimer/{id}', 'ApprenantController@delete');
Route::put('/UpdateApprenant/{id}', 'ApprenantController@Update');

// CRUD Formateur
Route::post('/AjoutFormateur', 'FormateurController@store');
Route::delete('/FormateurSupprimer/{id}', 'FormateurController@delete');
Route::post('/ModifierFormateur/{id}', 'FormateurController@Update');
Route::get('/ListFormateur', 'FormateurController@index');


// feedback
Route::post('/ajoutFeedback', 'feedbackController@store');
Route::get('/feedback', 'feedbackController@index');
Route::delete('/supprimerFeedback/{id}', 'feedbackController@destroy');

// CRUD Formation
Route::post('/AjoutFormation', 'FormationController@store');
Route::get('/ConsulterFormation', 'FormationController@index');
Route::get('/formations/getByID/{id}', 'FormationController@getByID');
Route::get('/FormationSupprimer/{id}', 'FormationController@delete');
// inscription à une formation
Route::post('/formations/inscription', 'FormationController@inscription');

Route::get('/GestionProfile/{id}', 'ApprenantController@edit');

Route::get('/GestionProfile{id}', 'FormateurController@edit');

Route::get('/ListApprenant/{id}', 'ApprenantController@show');

// avis
Route::get('/ListAvis', 'avisFormation@index');
Route::get('/AvisSupprimer{id}', 'avisFormation@delete');
Route::get('/AvisCreate', 'avisFormation@store');


Route::get('/ConfirmerInscription{id}', 'ConsulterFormation@confirmer');
Route::get('/Inscription{id}', 'ConsulterFormation@store');
Route::get('/GestionFormation{id}', 'FormationController@edit');
Route::post('/updateFormation/{id}', 'FormationController@update');



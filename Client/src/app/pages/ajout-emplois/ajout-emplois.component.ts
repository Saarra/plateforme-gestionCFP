import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FormationService} from '../../services/Formation/formation.service';
import {EmploiService} from '../../services/Emploi/emploi.service';
import { saveAs } from 'file-saver';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ajout-emplois',
  templateUrl: './ajout-emplois.component.html',
  styleUrls: ['./ajout-emplois.component.css']
})
export class AjoutEmploisComponent implements OnInit {

  files: any;
  filedata: any;
  formations: any[]=[];
  form: FormGroup;
  idEmplois;
  constructor(private formationService: FormationService,
              private formBuilder: FormBuilder,
              private emploiService: EmploiService,
              private toastr: ToastrService, private _location: Location,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idEmplois = params['idEmplois'];
    });
  }

  onSubmit() {
    let data = this.form.value;
    data.fichier = this.filedata;
    //saveAs(this.filedata);
    this.emploiService.add(data).then(resp=>{
      if(resp===true){
        this._location.back();
      }else{
        this.toastr.error('Une erreur inattendue s’est produite!');
      }
    });
  }

  ngOnInit(): void {
    this.getFormations();
    this.initialform();
  }

  getFormations() {
  this.formationService.getAll().then(resp=>{
    this.formations = resp.map(obj=>{
      return {
        id: obj.id,
        text: obj.nomFormation
      };
    });

  })
  }
  initialform(){
    this.form = this.formBuilder.group({
      id: '',
      idFormation: ['', [Validators.required]],
      groupe: ['', Validators.required],
      fichier: [''],
    });
    if(this.idEmplois!== undefined){
      this.emploiService.getByID(this.idEmplois).then(resp=>{
        this.form.controls.id.setValue(resp.id);
        this.form.controls.idFormation.setValue(resp.idFormation);
        this.form.controls.groupe.setValue(resp.groupe);
      })
    }
  }
  fileEvent(e) {
    //this.filedata = e.target.files[0];
    var files = e.target.files;
    var reader = new FileReader();
    let that = this;
    reader.onload = function (frEvent: any) {
      that.filedata=frEvent.target.result;
    };
    reader.readAsDataURL(files[0]);
  }

  update() {
    let data = this.form.value;
    data.fichier = this.filedata;
    //saveAs(this.filedata);
    this.emploiService.edit(data).then(resp=>{
      if(resp===true){
        this._location.back();
      }else{
        this.toastr.error('Une erreur inattendue s’est produite!');
      }
    })
  }
}

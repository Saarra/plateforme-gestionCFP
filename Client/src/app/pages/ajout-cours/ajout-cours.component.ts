import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormationService} from '../../services/Formation/formation.service';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourService} from '../../services/Cour/cour.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-ajout-cours',
  templateUrl: './ajout-cours.component.html',
  styleUrls: ['./ajout-cours.component.css']
})
export class AjoutCoursComponent implements OnInit {
  idFormation: string = 'empty';
  idCour: string;
  formations: any[] = [];
  form : FormGroup;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private formationService: FormationService, private _location: Location,
              private formBuilder: FormBuilder, private courService: CourService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idFormation = params['idFormation'];
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.idCour = params['idCour'];
    });
    //this.idFormation = this.activatedRoute.snapshot.paramMap.get('idFormation');
    this.initialform();
    this.formationService.getByFormateur().then(resp=>{
      this.formations = resp.map(obj => {
        return {
          id: obj.id,
          text: obj.nomFormation
        };
      });
    });
  }
  initialform(){
    this.form = this.formBuilder.group({
      id: ['',],
      idFormation: [this.idFormation!==undefined?this.idFormation:'', Validators.required],
      nomCours: ['', Validators.required],
      descCours: ['', Validators.required],
      fichier: ['']
    });
    if(this.idCour!==undefined){
      this.courService.getByID(this.idCour).then(resp=>{
        console.log(resp);
        this.form.patchValue(resp);
      })
    }
  }

  back() {
    this._location.back()
  }
  save(){
    if(this.form.valid){
      this.courService.add(this.form.value).then(resp=>{
        if(resp===true){
          this._location.back()
        }else{
          this.toastr.error('Une erreur inattendue s’est produite!');
        }
      })
    }
  }
  edit(){
    this.courService.edit(this.form.value).then(resp=>{
      if(resp===true){
        this._location.back()
      }else{
        this.toastr.error('Une erreur inattendue s’est produite!');
      }
    })
  }

  changefile(evt) {
    var files = evt.target.files;
    var reader = new FileReader();
    let that = this;
    reader.onload = function (frEvent: any) {
      that.form.controls.fichier.setValue( frEvent.target.result);
    };
    reader.readAsDataURL(files[0]);
  }
}

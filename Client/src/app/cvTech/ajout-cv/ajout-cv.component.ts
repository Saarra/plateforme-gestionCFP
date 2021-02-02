import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CvService} from '../cv.service';
import {User} from '../../services/auth.service';
import {AuthentificationService} from '../../services/authentification.service';
import {ToastrService} from 'ngx-toastr';
import {FormateurService} from '../../services/formateur.service';

@Component({
  selector: 'app-ajout-cv',
  templateUrl: './ajout-cv.component.html',
  styleUrls: ['./ajout-cv.component.css']
})
export class AjoutCvComponent implements OnInit {
 form : FormGroup;
  private idFormateur: any;
 user: User = new User();
  private formateurs: any[] = [];
  constructor(private formBuilder: FormBuilder, private cvService: CvService,private toastr: ToastrService,
              private authentificationService: AuthentificationService, private formateurService: FormateurService) { }

  ngOnInit(): void {
    this.initial();
    this.formateurService.read().subscribe(resp => {
      this.formateurs = resp.map(obj => {
        return {
          id: obj.id,
          text: obj.name
        };
      });
    });
   this.authentificationService.profileUser().subscribe(user=>{
     this.user = user;
     setTimeout(()=>{
       if(user.codeRole === "formateur"){
         this.cvService.getByFormateur(user.id).then(resp=>{
           if(resp.length!== 0){
             this.form.patchValue(resp[0]);
           }else{
             this.form.controls.idFormateur.setValue(this.user.id)
           }
         })
       }
     }, 2000)
   })
  }
  initial(){
   this.form = this.formBuilder.group({
     id: '',
     designation: ['', Validators.required],
     experience:[''],
     diplome:[''],
     idFormateur:[''],
     facebook: [''],
     linkedin:[''],
     github: [''],
   })
  }

  save() {
   if(this.form.valid){
     this.cvService.save(this.form.value).then(resp=>{
       if(resp=== true){
         this.toastr.success('CV', 'CV est enregistré avec succés');
       }else{
         this.toastr.error('CV', 'Une erreur inattendue s’est produite!');
       }
     })

   }
  }
  update(){
    if(this.form.valid){
      this.cvService.update(this.form.value).then(resp=>{
        if(resp=== true){
          this.toastr.success('CV', 'CV est modifier avec succés');
        }else{
          this.toastr.error('CV', 'Une erreur inattendue s’est produite!');
        }      })
    }
  }
}

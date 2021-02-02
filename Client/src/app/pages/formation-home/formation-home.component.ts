import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Formation} from '../../Model/formation';
import {FormationService} from '../../services/Formation/formation.service';
import {TokenService} from '../../services/token.service';
import {AuthentificationService} from '../../services/authentification.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationService} from 'primeng';

@Component({
  selector: 'app-formation-home',
  templateUrl: './formation-home.component.html',
  styleUrls: ['./formation-home.component.css']
})
export class FormationHomeComponent implements OnInit {
  ficheUrl= environment.publicUrl +'formations/';
  listformations: Formation[]=[];
  constructor(private formationService : FormationService,
              private  authService: AuthentificationService,
              private route: Router,
              private toastr: ToastrService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getFormations()
  }
  getFormations(){
    this.formationService.getAll().then(resp=>{
      this.listformations= resp;
    })
  }

  confirmIns(formation) {
    this.confirmationService.confirm({
      message: 'Voulez-vous inscrit dans '+ formation.nomFormation + ' ?',
      header: 'Inscription',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.inscscrit(formation.id);
      },
      reject: () => {
      }
    });

  }
  inscscrit(id){
    this.authService.profileUser().subscribe(user=>{
      let data = {
        idFormation: id,
        idUser: user.id
      };
      this.formationService.inscrit(data).then(resp=>{
        if(resp=== true){
          this.toastr.success('Vous avez inscrit dans cette formation');
          this.route.navigateByUrl('/FormationHome')
        }else{
          this.toastr.warning('Votre inscription est au cours du traitement!')
        }
      })
    },error => {
      this.route.navigateByUrl('login')
    })
  }
}

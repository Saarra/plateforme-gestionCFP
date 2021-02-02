import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { pulse } from 'ng-animate';
import {Formation} from '../../../Model/formation';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {FormationService} from '../../../services/Formation/formation.service';
import {TokenService} from '../../../services/token.service';
import {AuthentificationService} from '../../../services/authentification.service';
import {ApprenantService} from '../../../services/apprenant.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
  animations: [
    trigger('pulse', [transition('* => *', useAnimation(pulse))])
  ],
})
export class CatalogueComponent implements OnInit {
  formation : Formation = new Formation();
  fichierUrl = environment.publicUrl+'formations/';
  pulse: any;
  constructor(private router: ActivatedRoute,
              private formationService: FormationService,
              private tokenService: TokenService,
              private  authService: AuthentificationService,
              private route: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formationService.getByID(this.router.snapshot.paramMap.get('id')).then(resp=>{
      this.formation= resp[0];
    })
  }

  login(idFormation) {
    this.authService.profileUser().subscribe(user=>{
     let data = {
        idFormation: idFormation,
        idUser: user.id
      };
      this.formationService.inscrit(data).then(resp=>{
        if(resp=== true){
          this.toastr.success('vous avez inscrit dans cette formation');
          this.route.navigateByUrl('/FormationHome')
        }else{
          this.toastr.warning('Votre inscription est au cours du traitement')
        }
      })
    },
    error => {
      this.route.navigateByUrl('login')
    })
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormationService} from '../../../services/Formation/formation.service';
import {MaterialService} from '../../../services/Material/material.service';
import {User} from '../../../services/auth.service';
import {TokenService} from '../../../services/token.service';
import {AuthentificationService} from '../../../services/authentification.service';
import {ReservationService} from '../../../services/Reservation/reservation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-ajout-reservation',
  templateUrl: './ajout-reservation.component.html',
  styleUrls: ['./ajout-reservation.component.css']
})
export class AjoutReservationComponent implements OnInit {
  form: FormGroup;
  formation: any[] = [];
  material: any[] = [];
  user: User = new User();
  etats: any[] = [
    {
      id: 'En etant',
      text: 'En etant'
    },
    {
      id: 'Traiter',
      text: 'Traiter'
    },
  ];
  idReservation: string;
   submitted = false;
  constructor(private formBuilder: FormBuilder, private formationService: FormationService,
              private materailService: MaterialService, private reservationService: ReservationService,
              private  authService: AuthentificationService, private route: Router,
              private toastr: ToastrService, private datePipe: DatePipe,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idReservation = params['id'];
    });
  }

  ngOnInit(): void {
    this.authService.profileUser().subscribe(user => {
      this.user = user;
    });
    this.initForm();
    this.formationService.getAll().then(resp => {
      this.formation = resp.map(obj => {
        return {
          id: obj.id,
          text: obj.nomFormation
        };
      });
    });

    this.materailService.getAll().then(material => {
      this.material = material.map(obj => {
        return {
          id: obj.id,
          text: obj.designation
        };
      });
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: '',
      idFormation: ['', [Validators.required]],
      idFormateur: [this.user.id,],
      idMaterial: ['', [Validators.required]],
      etat: ['En etant', [Validators.required]],
      dateDebut: [new Date(), Validators.required],
      dateFin: [new Date(), Validators.required]
    });
    if (this.idReservation!== undefined){
      this.reservationService.getbyID(this.idReservation).then(resp=>{
        this.form.patchValue(resp);
        this.form.controls.dateDebut.setValue(new Date(resp.dateDebut));
        this.form.controls.dateFin.setValue(new Date(resp.dateFin));
      })
    }
  }

  goBack() {
    this.route.navigateByUrl('list-reseravtion');
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      let obj = this.form.value;
      obj.dateDebut = this.datePipe.transform(obj.dateDebut, 'yyyy-MM-dd HH:mm:ss');
      obj.dateFin = this.datePipe.transform(obj.dateFin, 'yyyy-MM-dd HH:mm:ss');
      this.reservationService.add(obj).then(resp => {
        if (resp === true) {
          this.toastr.success('reservation ajouter avec succès!');
          this.route.navigateByUrl('list-reseravtion');
        } else {
          this.toastr.error('Une erreur inattendue s’est produite!');
        }
      });
    }

  }

  update() {
    this.submitted = true;
    if (this.form.valid) {
      let obj = this.form.value;
      obj.dateDebut = this.datePipe.transform(obj.dateDebut, 'yyyy-MM-dd HH:mm:ss');
      obj.dateFin = this.datePipe.transform(obj.dateFin, 'yyyy-MM-dd HH:mm:ss');
      this.reservationService.edit(obj).then(resp => {
        if(resp.status === "success"){
          this.toastr.success('Reservation modifier avec succès!');
          this.goBack();
        }else if(resp.status === "Traiter"){
          this.toastr.warning('Resevation déja traiter merci de contacter votre admin!');
        }
        else{
          this.toastr.error('Une erreur inattendue s’est produite!');
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {ReservationService} from '../../services/Reservation/reservation.service';
import {FormationService} from '../../services/Formation/formation.service';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationService} from 'primeng';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  cols = [
          {field: 'action', header: 'Action', class: 'ui-p-1'},
          {field: 'formateur', header: 'Formateur', class: 'ui-p-2'},
          {field: 'formation', header: 'Formation', class: 'ui-p-3'},
          {field: 'material', header: 'Matériel', class: 'ui-p-4'},
          {field: 'etat', header: 'Etat', class: 'ui-p-5'},
          {field: 'dateDebut', header: 'Date Début', class: 'ui-p-6'},
          {field: 'dateFin', header: 'Date Fin', class: 'ui-p-7'},
  ];
  loading: boolean = false;
  data: any[] = [];
  constructor(private reservationService: ReservationService, private toastr: ToastrService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
   this.reservationService.getAll().then(resp=>{
     this.data = resp;
   })
  }

  confirmDelete(rowData) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimmer?',
      header: 'Supprimmer Reservation',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Oui',
      rejectLabel:'Non',
      accept: () => {
        this.reservationService.delete(rowData.id).then(resp=>{
          if(resp.status === "success"){
            this.getAll();
            this.toastr.success('Reservation supprimmer avec succès!');
          }else if(resp.status === "Traiter"){
            this.toastr.warning('Resevation déja traiter merci de contacter votre admin!');
          }
          else{
            this.toastr.error('Une erreur inattendue s’est produite!');
          }
        });
      },
      reject: () => {
      }
    });
  }

  edit(rowData) {
    this.router.navigateByUrl('ajout-reservation?id='+rowData.id)
  }
}

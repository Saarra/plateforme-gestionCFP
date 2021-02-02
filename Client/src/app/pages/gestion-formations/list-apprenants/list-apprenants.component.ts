import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApprenantService} from '../../../services/apprenant.service';
import {ConfirmationService} from 'primeng';
import {FormationService} from '../../../services/Formation/formation.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-apprenants',
  templateUrl: './list-apprenants.component.html',
  styleUrls: ['./list-apprenants.component.css']
})
export class ListApprenantsComponent implements OnInit {
  idFormation: string;
  cols = [
    {field: 'action', header: 'Action', class: 'ui-p-1'},
    {field: 'name', header: 'Nom', class: 'ui-p-2'},
    {field: 'firstname', header: 'Prénom', class: 'ui-p-3'},
    {field: 'dateNais', header: 'Date naissance', class: 'ui-p-4'},
    {field: 'email', header: 'E-mail' , class: 'ui-p-5'},
    {field: 'adresse', header: 'Adresse' , class: 'ui-p-6'}
  ];
  loading: boolean = false;
  data: any[] = [];
  titre: string;
  constructor(private dialogRef: MatDialogRef<ListApprenantsComponent>,
              @Inject(MAT_DIALOG_DATA) data, private service:ApprenantService,
              private confirmationService: ConfirmationService,private toastr: ToastrService,) {
    this.idFormation = data.idFormation;
    this.titre = data.nomFormation
  }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.service.getApprenantByFormation(this.idFormation).then(resp => {
      this.data = resp;
    })
  }

  close(value: boolean) {
    this.dialogRef.close({
      submitted:value
    });
  }

  confirmDelete(data) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimmer?',
      header: 'Supprimmer Formation',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Oui',
      rejectLabel:'Non',
      accept: () => {
        this.service.inscriptionCancel(data.idIsncription).then(resp=>{
          if(resp === true){
            this.getAll();
            this.toastr.success('Formation supprimmer avec succès!');
          }else{
            this.toastr.error('Une erreur inattendue s’est produite!');
          }
        });
      },
      reject: () => {
      }
    });
  }
}

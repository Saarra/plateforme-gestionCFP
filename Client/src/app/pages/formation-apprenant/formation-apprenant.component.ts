import { Component, OnInit } from '@angular/core';
import {FormationService} from '../../services/Formation/formation.service';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationService} from 'primeng';
import {DatePipe} from '@angular/common';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AuthentificationService} from '../../services/authentification.service';
import {User} from '../../services/auth.service';
import { env } from 'process';
import { environment } from 'src/environments/environment';
import {ListApprenantsComponent} from '../gestion-formations/list-apprenants/list-apprenants.component';
import {FormationCourComponent} from './formation-cour/formation-cour.component';

@Component({
  selector: 'app-formation-apprenant',
  templateUrl: './formation-apprenant.component.html',
  styleUrls: ['./formation-apprenant.component.css']
})
export class FormationApprenantComponent implements OnInit {
  BASE_URLPieceJointe = environment.publicUrl + 'formations/';
  cols = [
    {field: 'action', header: 'Action', class: 'ui-p-1'},
    {field: 'nomFormation', header: 'Nom', class: 'ui-p-2'},
    {field: 'descriptionFormation', header: 'Objectif', class: 'ui-p-3'},
    {field: 'dureeFormation', header: 'Dureé', class: 'ui-p-4'},
    {field: 'dateDebut', header: 'Date début', class: 'ui-p-9'},
    {field: 'dateFin', header: 'Date fin', class: 'ui-p-9'},
    {field: 'formateur', header: 'Formateur', class: 'ui-p-6'},
  ];
  loading: boolean = false;
  user: User;
  data: any[] = [];
  constructor( private formationService: FormationService, private toastr: ToastrService,
               private confirmationService: ConfirmationService, private datePipe: DatePipe,
               public dialog: MatDialog, private authentificationService: AuthentificationService) { }

  ngOnInit(): void {
    this.authentificationService.profileUser().subscribe(resp=>{
      this.user= resp;
      this.getByapprenant();
    })
  }


  getByapprenant(){
    this.formationService.getByApprenant(this.user.id).then(result=>{
      this.data = result;
    });
  }

  donwloadFile(data) {
    window.open(this.BASE_URLPieceJointe + data);
  }
  showCours(data){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idFormation : data.id,
      nomFormation: data.nomFormation
    };
    const dialogRef = this.dialog.open(FormationCourComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result.submitted===true){

        }
      }
    )
  }
}

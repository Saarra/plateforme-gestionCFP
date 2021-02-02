import { Component, OnInit } from '@angular/core';
import {FormationService} from '../../services/Formation/formation.service';
import {environment} from '../../../environments/environment';
import {EmploiService} from '../../services/Emploi/emploi.service';
import {ConfirmationService} from 'primeng';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gestion-emplois',
  templateUrl: './gestion-emplois.component.html',
  styleUrls: ['./gestion-emplois.component.css']
})
export class GestionEmploisComponent implements OnInit {
  BASE_URLPieceJointe2 = environment.publicUrl + 'emplois/';
  cols = [
    {field: 'action', header: 'Action', class: 'ui-p-1'},
    {field: 'formation', header: 'Formations', class: 'ui-p-2'},
    {field: 'groupe', header: 'Groupe', class: 'ui-p-3'},
    {field: 'created_at', header: 'Date Planification', class: 'ui-p-4'},
    {field: 'fichier', header: 'Support', class: 'ui-p-5'},
  ];
  loading: boolean = false;
  data: any[] = [];
  constructor(private emploiService: EmploiService,
  private confirmationService: ConfirmationService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading = true;
    this.emploiService.getAll().then(resp=>{
      this.loading = false;
      this.data = resp;
    })
  }

  donwloadFile(rowDatum: any) {
    window.open(this.BASE_URLPieceJointe2 + rowDatum);
  }
  confirmDelete(data) {
    console.log(data);
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimmer?',
      header: 'Supprimmer Emploi',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.emploiService.delete(data.id).then(resp=>{
          if(resp.status === 'success'){
            this.getAll();
            this.toastr.success('Emploi supprimmer avec succès!');
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
    this.router.navigateByUrl('ajout-emplois?idEmplois='+rowData.id)
  }
}

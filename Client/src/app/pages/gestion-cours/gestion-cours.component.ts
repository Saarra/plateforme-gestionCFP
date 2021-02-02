import {Component, OnInit} from '@angular/core';
import {CourService} from '../../services/Cour/cour.service';
import {environment} from '../../../environments/environment';
import { saveAs } from 'file-saver';
import {ConfirmationService} from 'primeng';
import {FormationService} from '../../services/Formation/formation.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gestion-cours',
  templateUrl: './gestion-cours.component.html',
  styleUrls: ['./gestion-cours.component.css']
})
export class GestionCoursComponent implements OnInit {
  BASE_URLPieceJointe2 = environment.publicUrl + 'cours/';
  cols = [
    {field: 'action', header: 'Action', class: 'ui-p-1'},
    {field: 'nomCours', header: 'Nom cours', class: 'ui-p-2'},
    {field: 'descCours', header: 'Description du cours', class: 'ui-p-3'},
    {field: 'nomFormation', header: 'Formation', class: 'ui-p-4'},
    {field: 'fichier', header: 'Support du cour', class: 'ui-p-5'},
  ];
  loading: boolean = false;
  data: any[] = [];

  constructor(private courService: CourService,
              private confirmationService: ConfirmationService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.courService.findAll().then(resp => {
      this.data = resp;
    });
  }

  donwloadFile(rowData: any) {
    window.open(this.BASE_URLPieceJointe2 + rowData)
  }
  confirmDelete(data) {
    console.log(data);
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimmer?',
      header: 'Supprimmer Cour',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.courService.delete(data.id).then(resp=>{
          if(resp.status === 'success'){
            this.findAll();
            this.toastr.success('Cour supprimmer avec succès!');
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
    this.router.navigateByUrl('ajout-cours?idCour='+rowData.id)
  }
}

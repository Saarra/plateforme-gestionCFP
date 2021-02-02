import { Component, OnInit } from '@angular/core';
import {FormationService} from '../../services/Formation/formation.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.css']
})
export class ListFormationsComponent implements OnInit {
  BASE_URLPieceJointe1 = environment.publicUrl + 'formations/';
  BASE_URLPieceJointe2 = environment.publicUrl + 'cours/';
  file: any[] = [];
  cols = [
    {field: 'action', header: 'Action', class: 'ui-p-1'},
    {field: 'nomFormation', header: 'Nom', class: 'ui-p-2'},
    {field: 'descriptionFormation', header: 'Description', class: 'ui-p-3'},
    {field: 'dureeFormation', header: 'Dureé', class: 'ui-p-4'},
    {field: 'prixFormation', header: 'Prix', class: 'ui-p-5'},
  ];
  loading: boolean = false;
  data: any[] = [];
  constructor(private formationService: FormationService, private router: Router) { }

  ngOnInit(): void {
   this.getFormation();
  }
  getFormation(){
    this.formationService.getByFormateur().then(res=>{
      this.data = res;
    })
  }

  donwloadFile(data: any) {
    window.open(this.BASE_URLPieceJointe1 + data);
  }
  donwloadCour(data: any) {
    window.open(this.BASE_URLPieceJointe2 + data);
  }

  createCour(rowData) {
    this.router.navigateByUrl('ajout-cours?idFormation='+rowData.id)
  }
}

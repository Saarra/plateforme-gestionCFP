import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CourService} from '../../../services/Cour/cour.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-formation-cour',
  templateUrl: './formation-cour.component.html',
  styleUrls: ['./formation-cour.component.css']
})
export class FormationCourComponent implements OnInit {
  BASE_URLPieceJointe2 = environment.publicUrl + 'cours/';
  cols = [
    /*{field: 'action', header: 'Action', class: 'ui-p-1'},*/
    {field: 'nomCours', header: 'Nom cours', class: 'ui-p-2'},
    {field: 'descCours', header: 'Description du cours', class: 'ui-p-3'},
    {field: 'fichier', header: 'Support du cour', class: 'ui-p-5'},
  ];
  loading: boolean = false;
  data: any[] = [];
  idFormation: string;
  nomformation: string
  constructor(private dialogRef: MatDialogRef<FormationCourComponent>,
              @Inject(MAT_DIALOG_DATA) data, private service:CourService) {
    this.idFormation = data.idFormation;
    this.nomformation = data.nomFormation;
  }

  ngOnInit(): void {
    this.service.getByFormation(this.idFormation).then(resp=>{
      this.data = resp;
    })
  }

  close(value: boolean) {
    this.dialogRef.close({
      submitted:value
    });
  }

  donwloadFile(rowData: any) {
    window.open(this.BASE_URLPieceJointe2 + rowData)
  }
}

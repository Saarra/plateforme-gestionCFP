import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Formation} from '../../Model/formation';
import {FormateurService} from '../../services/formateur.service';
import {FormationService} from '../../services/Formation/formation.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';
import {RoleService} from '../../services/Role/role.service';
import {ConfirmationService} from 'primeng';
import {DatePipe} from '@angular/common';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ListApprenantsComponent} from './list-apprenants/list-apprenants.component';

@Component({
  selector: 'app-gestion-formations',
  templateUrl: './gestion-formations.component.html',
  styleUrls: ['./gestion-formations.component.css']
})
export class GestionFormationsComponent implements OnInit {
  showModal = false;
  formation: Formation;
  formationForm: FormGroup;
  formateurs: any[] = [];
  BASE_URLPieceJointe = environment.publicUrl + 'formations/';
  file: any[] = [];
  cols = [
    {field: 'action', header: 'Action', class: 'ui-p-1'},
    {field: 'nomFormation', header: 'Nom', class: 'ui-p-2'},
    {field: 'descriptionFormation', header: 'Objectif', class: 'ui-p-3'},
    {field: 'dureeFormation', header: 'Dureé', class: 'ui-p-4'},
    {field: 'dateDebut', header: 'Date début', class: 'ui-p-9'},
    {field: 'dateFin', header: 'Date fin', class: 'ui-p-9'},
    {field: 'prixFormation', header: 'Prix', class: 'ui-p-5'},
    {field: 'formateur', header: 'Formateur', class: 'ui-p-6'},
    // {field: 'espaceCours', header: 'Escpace Cour', class: 'ui-p-7'},
    {field: 'fichier', header: 'Fichier', class: 'ui-p-8'}
  ];
  loading: boolean = false;
  data: any[] = [];

  constructor(private formBuilder: FormBuilder, private formateurService: FormateurService,
              private formationService: FormationService, private toastr: ToastrService,
              private confirmationService: ConfirmationService, private datePipe: DatePipe,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initialForm();
    this.getAll();
    this.formateurService.read().subscribe(resp => {
      this.formateurs = resp.map(obj => {
        return {
          id: obj.id,
          text: obj.name
        };
      });
    });
  }

  getAll() {
    this.loading = true;
    this.formationService.getAll().then(result => {
      this.data = result;
      this.loading = false;
    });
  }

  initialForm() {
    this.formationForm = this.formBuilder.group({
      id: ['',],
      nomFormation: ['', Validators.required],
      descriptionFormation: ['', Validators.required],
      dureeFormation: ['', Validators.required],
      prixFormation: ['', Validators.required],
      espaceCours: [false],
      idFormateur: [''],
      fichier: [],
      dateDebut: [new Date()],
      dateFin: [new Date()]
    });
  }

  onSelectedFile(evt) {
    var files = evt.target.files;
    var reader = new FileReader();
    let that = this;
    reader.onload = function (frEvent: any) {
      that.file.push({
        file: frEvent.target.result,
        name: evt.target.files[0].name,
      });
    };
    reader.readAsDataURL(files[0]);

  }

  save() {
    let obj = this.formationForm.value;
    obj.fichier = this.file;
    obj.dateDebut = this.datePipe.transform(obj.dateDebut, 'yyyy-MM-dd HH:mm:ss');
    obj.dateFin = this.datePipe.transform(obj.dateFin, 'yyyy-MM-dd HH:mm:ss');
    this.formationService.addFormation(obj).then(resp => {
      if (resp === true) {
        this.toastr.success('Formation ajouter avec succès!');
        this.showModal = false;
        this.initialForm();
        this.getAll();
      } else{
        this.toastr.error('Une erreur inattendue s’est produite!');
      }
    });
  }

  donwloadFile(data) {
    window.open(this.BASE_URLPieceJointe + data);
  }

  update() {
    let obj = this.formationForm.value;
    obj.fichier = this.file;
    obj.dateDebut = this.datePipe.transform(obj.dateDebut, 'yyyy-MM-dd HH:mm:ss');
    obj.dateFin = this.datePipe.transform(obj.dateFin, 'yyyy-MM-dd HH:mm:ss');
    this.formationService.editFormation(obj.id, obj).then(resp => {
      if (resp === true) {
        this.toastr.success('Formation Modifieé avec succès!');
        this.showModal = false;
        this.initialForm();
        this.getAll();
      }else{
        this.toastr.error('Une erreur inattendue s’est produite!');
      }
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
        this.formationService.delete(data.id).then(resp=>{
          if(resp=== true){
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

  edit() {
    this.formationForm.controls.dateDebut.setValue(new Date(this.formationForm.value.dateDebut));
    this.formationForm.controls.dateFin.setValue(new Date(this.formationForm.value.dateFin));

  }
  showApprenants(data){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idFormation : data.id,
      nomFormation: data.nomFormation
    };
    const dialogRef = this.dialog.open(ListApprenantsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result.submitted===true){

        }
      }
    )
  }
}

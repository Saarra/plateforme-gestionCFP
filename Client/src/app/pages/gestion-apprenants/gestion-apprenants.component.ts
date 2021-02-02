import {Component, OnInit} from '@angular/core';
import {Observable, from} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Apprenant} from 'src/app/Model/apprenant';
import {ApprenantService} from 'src/app/services/apprenant.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../services/Role/role.service';
import {ConfirmationService} from 'primeng';

export const listApp = [];

@Component({
  selector: 'app-gestion-apprenants',
  templateUrl: './gestion-apprenants.component.html',
  styleUrls: ['./gestion-apprenants.component.css']
})
export class GestionApprenantsComponent implements OnInit {
  current_Apprenant: Apprenant;
  crud_operation = {is_new: false, is_visible: false};
  confirm = true;
  showModal: boolean = false;
  apprenantForm: FormGroup;
  cols = [
    {field: 'action', header: 'Action', class: 'ui-p-1'},
    {field: 'name', header: 'Nom', class: 'ui-p-2'},
    {field: 'firstname', header: 'Prénom', class: 'ui-p-3'},
    {field: 'dateNais', header: 'Date naissance', class: 'ui-p-4'},
    {field: 'email', header: 'E-mail' , class: 'ui-p-5'},
    {field: 'adresse', header: 'Adresse' , class: 'ui-p-6'}
  ];
  submitted = false;
  loading: boolean = false;
  data: any[] = [];

  constructor(private formBuilder: FormBuilder, private service: ApprenantService, private toastr: ToastrService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getAll();
    this.initialForm();
  }

  getAll() {
    this.service.read().subscribe((res: any) => {
      this.data = res;
      this.current_Apprenant = new Apprenant();
    });
  }

  initialForm() {
    this.submitted = false;
    this.apprenantForm = this.formBuilder.group({
      id: ['', ],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      password: ['', Validators.required],
      dateNais: ['', Validators.required],
      role: [''],
      image: []
    });
  }

  new() {
    this.current_Apprenant = new Apprenant();
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }

  save() {
    this.submitted = true;
    if (this.apprenantForm.valid) {
      this.service.insert(this.apprenantForm.value).then(res => {
        if (res === true) {
          this.getAll();
          this.initialForm();
          this.showModal = false;
          this.toastr.success('Apprenant bien ajouté !');
        } else if (res === false) {
          this.toastr.warning('Email exist !');
        } else {
          this.toastr.error('Une erreur inattendue s’est produite!');
        }

      });
    }


  }

  update() {
    this.submitted = true;
    if (this.apprenantForm.valid) {
      this.service.update(this.apprenantForm.value).subscribe(res => {
        if (res === true) {
          this.getAll();
          this.showModal = false;
          this.initialForm();
          this.toastr.success('Apprenant modifié avec succès!');
        } else if (res === false) {
          this.toastr.warning('Email exist !');
        } else {
          this.toastr.error('Une erreur inattendue s’est produite!');
        }

      });
    }
  }

  edit(row) {
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = false;
    this.current_Apprenant = row;
  }

  delete(id) {
    this.service.delete(id).subscribe(res => {
      this.crud_operation.is_new = false;
      this.ngOnInit();
      this.toastr.info('Apprenant supprimé  avec succès!');
    });
  }

  confirmDelete(data) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimmer?',
      header: 'Supprimmer Formateur',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.delete(data.id);
      },
      reject: () => {
      }
    });
  }
}


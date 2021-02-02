import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Formateur} from 'src/app/Model/formateur';
import {FormateurService} from 'src/app/services/formateur.service';
import {RoleService} from '../../services/Role/role.service';
import {ConfirmationService} from 'primeng';


@Component({
  selector: 'app-gestion-formateurs',
  templateUrl: './gestion-formateurs.component.html',
  styleUrls: ['./gestion-formateurs.component.css']
})


export class GestionFormateursComponent implements OnInit {
  formateurs: Observable<Formateur[]>;
  data: Formateur[];
  current_Formateur: Formateur = new Formateur();
  crud_operation = {is_new: false, is_visible: false};
  confirm = true;


  listRole: any[] = [];
  showModal: boolean;
  cols = [
    { field: 'action', header: 'Action', class:'ui-p-1' },
    { field: 'name', header: 'Nom', class:'ui-p-2' },
    {field: 'firstname', header: 'Prénom' , class:'ui-p-3'},
    { field: 'dateNais', header: 'Date naissance', class: 'ui-p-4' },
    // { field: 'cin', header: 'CIN' , class: 'ui-p-5'},
    { field: 'email', header: 'E-mail' , class: 'ui-p-7'},
    { field: 'adresse', header: 'Adresse' , class: 'ui-p-6'}
  ];
  loading: boolean= false;
  private msgs: any;


  constructor(private service: FormateurService, private toastr: ToastrService,
              private roleService: RoleService, private confirmationService: ConfirmationService) {
    this.data = [];
  }

  ngOnInit(): void {
    this.read();
  }

  read() {
    this.service.read().subscribe((res: any) => {
      this.data = res;
      this.current_Formateur = new Formateur();
    });
  }

  getRole() {
    this.roleService.getWithOutAdmin().then(result => {
      this.listRole = result.map(obj => {
        return {
          id: obj.id,
          text: obj.designation
        };
      });
    });
  }

  new() {
    this.current_Formateur = new Formateur();
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }

  save() {
    console.log(this.current_Formateur);
    if (this.crud_operation.is_new) {
      this.current_Formateur.role="3";
      this.service.insert(this.current_Formateur).subscribe(res => {
        if (res === true) {
          this.showModal = false;
          this.current_Formateur = new Formateur();
          this.crud_operation.is_visible = false;
          this.read();
          this.toastr.success('Formateur bien ajouté !');
        } else {
          this.toastr.error('Erreur !');
        }
      });
      return;
    }
    this.service.update(this.current_Formateur).subscribe(res => {
      this.current_Formateur = new Formateur();
      this.crud_operation.is_visible = false;
      this.read();
      this.toastr.warning('Formateur modifié avec succès!');
    });
  }

  edit(row) {
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = false;
    this.current_Formateur = row;

  }

  delete(id) {
    this.service.delete(id).subscribe(res => {
      this.crud_operation.is_new = false;
      this.read();
      this.toastr.info('Formateur supprimé  avec succès!');
    });
  }
  confirmEdit(data) {
    this.confirmationService.confirm({
      message: 'Voulez-vous modifier?',
      header: 'Modfier Formateur',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.edit(data);
        this.showModal=true;
        this.getRole()
      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }
  confirmDelete(data) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimmer?',
      header: 'Supprimmer Formateur',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(data.id)
      },
      reject: () => {
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Register } from './register.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {RoleService} from '../../services/Role/role.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  data: any;
  message: any;
  errors = null;
  errorMessage = '';
  registerForm = new Register;
  listRole: any[]=[];
  constructor (
    private authentificationservice: AuthentificationService,
    public router: Router,
    private toastr: ToastrService,
    private roleService: RoleService) {}


  ngOnInit() {
    this.getRole();
  }
  getRole(){
    this.roleService.getWithOutAdmin().then(result => {
      this.listRole = result.map(obj=>{
        return {
          id: obj.id,
          text: obj.designation
        }
      });
    })
  }
  onSubmit() {
    console.log(this.registerForm);
    this.authentificationservice.register(this.registerForm).subscribe (
        result => {
        this.data = result;
        this.message = this.data.message;
        console.log(result);
        this.toastr.success(this.message);
        this.router.navigate(['login']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.errorMessage = 'Login ou mot de passe invalides';
        } else {
          this.errorMessage = 'Erreur de connexion, veuillez contacter l\'administrateur';
        }
      }
    );
  }

  changeRole(e) {

  }
}

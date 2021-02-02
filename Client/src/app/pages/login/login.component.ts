import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from 'src/app/services/authentification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Apprenant} from 'src/app/Model/apprenant';
import {TokenService} from 'src/app/services/token.service';
import {AuthStateService} from 'src/app/services/auth-state.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  UserProfile: Apprenant;
  errorMessage = '';
  isInscription: string;

  constructor(
    private authentificationService: AuthentificationService,
    private token: TokenService,
    private authState: AuthStateService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.isInscription = params['Inscription'];
    });
  }

  login(credentials) {
    console.log(credentials);
    this.authentificationService.login(credentials).subscribe(
      (reponse: any) => {
        console.log('response', reponse);
        this.responseHandler(reponse);
        const token = reponse['access_token'];
        const link = ['dashboard'];
        localStorage.setItem('token', token);
        if (reponse['role'] === '2') {
          this.router.navigate(['FormationHome']);
        } else {
          this.router.navigate(['dashboard']);
        }
        console.log('role', reponse['role']);
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

  // Handle response
  responseHandler(data) {
    this.token.handleData(data.access_token);
  }
}

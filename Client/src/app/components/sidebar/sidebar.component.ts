import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { NAVROUTES } from 'src/app/data/menu.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Apprenant } from 'src/app/Model/apprenant';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { TokenService } from 'src/app/services/token.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  UserProfile: Apprenant;
  routes: any = [];
  isSignedIn: boolean;
  public menuItems: any[];
  public isCollapsed = true;
  public role: any;

  constructor(
    private router: Router,
    private auth: AuthStateService,
    public token: TokenService,
    public authService: AuthentificationService ) {
      this.authService.profileUser().subscribe((data: any) => {
        this.UserProfile = data;
        console.log('role user connect', data['role']);
        this.routes = NAVROUTES;
        if ('1' === data['role']) {
          this.routes = this.routes.filter(route => route.role === 'admin');
        } else if  ('2' === data['role']) {
          this.routes = this.routes.filter(route => route.role === 'apprenant');
        } else if ('3' === data['role'])  {
          this.routes = this.routes.filter(route => route.role === 'formateur');
        } else {
        }
      }, error => {
        this.routes = this.router.navigateByUrl('/');
      });
   }

  ngOnInit() {
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
  });
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
  });
  }

   // Signout
   signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
}

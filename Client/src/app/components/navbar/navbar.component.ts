import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { NAVROUTES } from 'src/app/data/menu.model';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isSignedIn: boolean;
  public isCollapsed = true;
  public focus;
  public listTitles: any = [];
  public location: Location;
  constructor(location: Location,
      private element: ElementRef,
      private router: Router,
      private auth: AuthStateService,
    public token: TokenService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = NAVROUTES;
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
    this.router.navigateByUrl('/login');
  }
  getTitle(){
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#') {
        titlee = titlee.slice( 1 );
    }

    for ( let item = 0; item < this.listTitles.length; item++){
        if (this.listTitles[item].path === titlee) {
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  credenitals: any;

 baseUrl = environment.URL;
  constructor(private http: HttpClient) { }

  // register
  register(data): Observable<any>  {
    return this.http.post(this.baseUrl + 'register/', data);
  }
    // login
  login(credentials): Observable<any>  {
    return this.http.post(this.baseUrl + 'auth/login', credentials);
  }

    // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(this.baseUrl + 'auth/user-profile');
  }


}

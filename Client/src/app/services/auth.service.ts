import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';


// User interface
export class User {
  id: number;
  nom: String;
  email: String;
  password: String;
  password_confirmation: String;
  role: string;
  codeRole: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 baseURL = environment.URL
  constructor(private http: HttpClient) { }

  // User registration
  register(user: User): Observable<any> {
    return this.http.post(this.baseURL + 'auth/register', user);
  }

  // Login
  // signin(user: User): Observable<any> {
  //   return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', user);
  // }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(this.baseURL +  '/auth/user-profile');
  }
}

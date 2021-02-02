import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
 baseUrl = environment.URL + 'roles/';
  constructor(private httpclient: HttpClient) { }
  getAll() : Promise<any>{
    return this.httpclient.get(this.baseUrl).toPromise();
  }
  getWithOutAdmin(): Promise<any[]>{
    return this.httpclient.get<any[]>(this.baseUrl+ 'getWithOutAdmin').toPromise()
  }
  getByID(id) : Promise<any> {
    return this.httpclient.get(this.baseUrl + 'getByID/' + id).toPromise();
  }
  addRole(data) : Promise<boolean>{
    return this.httpclient.post<boolean>(this.baseUrl + 'addPost', data).toPromise()
  }
  aditRole(id, data) : Promise<boolean>{
    return this.httpclient.post<boolean>(this.baseUrl + 'editPost/' + id, data).toPromise()
  }
  delete(id) : Promise<any>{
    return this.httpclient.delete<any>(this.baseUrl + 'delete/' + id).toPromise()
  }
}

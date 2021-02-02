import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmploiService {
  baseURL = environment.URL + 'auth/emplois';
  constructor(private httpClient: HttpClient) { }
  getAll(): Promise<any[]> {
    return this.httpClient.get<any[]>(this.baseURL).toPromise();
  }
  getByID(id): Promise<any> {
    return this.httpClient.get(this.baseURL + '/getByID/' + id).toPromise();
  }
  add(data): Promise<any> {
    return this.httpClient.post(this.baseURL + '/add', data).toPromise();
  }
  edit(data): Promise<any> {
    return  this.httpClient.post(this.baseURL + '/edit/' + data.id, data).toPromise();
  }
  delete(id): Promise<any> {
    return this.httpClient.get(this.baseURL + '/delete/' + id).toPromise();
  }
  getByFormation(idFormation): Promise<any> {
    return this.httpClient.get(this.baseURL + '/getByformation' + idFormation).toPromise();
  }
}

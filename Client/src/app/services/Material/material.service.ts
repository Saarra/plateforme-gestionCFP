import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
 baseURL = environment.URL + 'auth/materials/';
  constructor(private httpClient: HttpClient) { }
  getAll(): Promise<any[]>{
    return this.httpClient.get<any[]>(this.baseURL).toPromise();
  }
  add(data): Promise<any>{
    return this.httpClient.post<any>(this.baseURL+'add', data).toPromise();
  }
  edit(data): Promise<any>{
    return this.httpClient.post<any>(this.baseURL+'edit', data).toPromise();
  }
  delete(id): Promise<any>{
    return this.httpClient.get<any>(this.baseURL + 'delete/'+ id).toPromise();
  }
}

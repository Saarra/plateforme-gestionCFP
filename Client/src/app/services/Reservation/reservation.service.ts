import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  baseURL = environment.URL + 'auth/DemanderMaterielle/';
  constructor(private httpClient: HttpClient) { }
  add(data): Promise<any>{
   return  this.httpClient.post<any>(this.baseURL +'add', data).toPromise();
  }
  edit(data): Promise<any>{
   return  this.httpClient.post<any>(this.baseURL +'edit', data).toPromise();
  }
  getAll(): Promise<any[]>{
   return  this.httpClient.get<any[]>(this.baseURL).toPromise();
  }
  getbyID(id): Promise<any>{
   return  this.httpClient.get<any>(this.baseURL+'getByID/' + id).toPromise();
  }
  delete(id): Promise<any>{
   return  this.httpClient.get<any>(this.baseURL+ 'delete/'+ id).toPromise();
  }
}

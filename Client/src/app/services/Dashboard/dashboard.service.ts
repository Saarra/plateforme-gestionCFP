import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseURL = environment.URL + 'auth/statistiques/';
  constructor(private httpClient: HttpClient) { }

  inscriptionByFormation(): Promise<any[]>{
    return  this.httpClient.get<any[]>(this.baseURL + 'inscriptionByFormation').toPromise();
  }
  formationsByYear(): Promise<any[]>{
    return  this.httpClient.get<any[]>(this.baseURL + 'formationsByYear').toPromise();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apprenant } from '../Model/apprenant';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApprenantService {
  data: Apprenant[];
  baseURL = environment.URL;
  constructor(public http: HttpClient) { }

  read() {
    return this.http.get(this.baseURL+'ListApprenant');
  }

 insert(data: Apprenant) : Promise<any>{
   return this.http.post(this.baseURL+'AjoutApprenant', data).toPromise();
 }

 update(data: Apprenant) {
   return this.http.put(this.baseURL+'UpdateApprenant/' + data.id, data);
 }
 delete(id) {
   return this.http.delete(this.baseURL+'ApprenantSupprimer/' + id);
 }
  // list apprenants inscrit in formations
  getApprenantByFormation(idFormation): Promise<any[]> {
    return this.http.get<any[]>(this.baseURL + 'auth/getApprenantByFormation/' + idFormation).toPromise();
  }
  // list apprenants inscrit in formations
  inscriptionCancel(id): Promise<any> {
    return this.http.get<any>(this.baseURL + 'auth/inscriptionCancel/' + id).toPromise();
  }
}

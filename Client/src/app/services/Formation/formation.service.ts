import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  baseUrl = environment.URL;
  constructor(private httpclient: HttpClient) { }
  getAll() : Promise<any>{
    return this.httpclient.get(this.baseUrl + 'ConsulterFormation').toPromise();
  }
  getByFormateur(): Promise<any[]>{
    return this.httpclient.get<any[]>(this.baseUrl + 'auth/formations/getByFormateur').toPromise()
  }
  getByApprenant(id): Promise<any[]>{
    return this.httpclient.get<any[]>(this.baseUrl + 'auth/formations/getByApprenant/' + id).toPromise()
  }
  addFormation(obj): Promise<any>{
    return this.httpclient.post(this.baseUrl + 'AjoutFormation', obj).toPromise();
  }
  editFormation(id,obj): Promise<any>{
    return this.httpclient.post(this.baseUrl + 'updateFormation/' + id, obj).toPromise();
  }
  getByID(id): Promise<any>{
    return this.httpclient.get(this.baseUrl + 'formations/getByID/' + id).toPromise();
  }
  delete(id): Promise<any>{
    return this.httpclient.get(this.baseUrl + 'FormationSupprimer/' + id).toPromise();
  }
  inscrit(data): Promise<any>{
    return this.httpclient.post<any>(this.baseUrl + 'formations/inscription', data).toPromise();
  }
}

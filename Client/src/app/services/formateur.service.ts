import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Formateur } from '../Model/formateur';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  data: Formateur[];
  baseUrl = environment.URL;
  constructor(public http: HttpClient) { }


  read(): Observable<any>{
    return this.http.get(this.baseUrl+'ListFormateur');
  }

 insert(data: Formateur) {
   return this.http.post(this.baseUrl +'AjoutFormateur', data);
 }

 update(data: Formateur) {
   return this.http.post(this.baseUrl +'ModifierFormateur/' + data.id, data);
 }
 delete(id) {
   return this.http.delete(this.baseUrl +'FormateurSupprimer/' + id);
 }

}

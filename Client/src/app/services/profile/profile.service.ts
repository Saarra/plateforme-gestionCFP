import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Formateur} from '../../Model/formateur';
import {Apprenant} from '../../Model/apprenant';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.URL + 'auth/';
  constructor(public http: HttpClient) { }

  update(data: Apprenant) {
    return this.http.post(this.baseUrl + 'update-profile/' + data.id, data);
  }
}

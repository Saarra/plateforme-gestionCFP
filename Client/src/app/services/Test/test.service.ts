import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Test} from '../../Model/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  baseUrl = environment.URL + 'auth/tests/';
  baseUrl2 = environment.URL + 'auth/reponses/';
  constructor(private httpClient: HttpClient) { }
  getAll(): Promise<Test[]>{
    return this.httpClient.get<Test[]>(this.baseUrl).toPromise();
  }
  getByApprenant(id): Promise<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl + 'getByApprenant/' + id).toPromise();
  }
  getByID(id): Promise<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl + 'getByID/' + id).toPromise();
  }
  getByFormation(id): Promise<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl + 'getByFormation/' + id).toPromise();
  }
  getReponses(idTest, idUser): Promise<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl2 + 'getByTestAndApp/' + idTest +'/'+idUser).toPromise();
  }
  testPassed(idTest, idUser): Promise<any>{
    return this.httpClient.get<any>(this.baseUrl + 'testPassed/' + idTest + '/' + idUser).toPromise();
  }
  passerTest(data, idUser): Promise<any>{
    return this.httpClient.post<any>(this.baseUrl2 + 'save/' + idUser , data).toPromise();
  }
  // tslint:disable-next-line: one-line
  add(data): Promise<any>{
    return this.httpClient.post<any>(this.baseUrl + 'add', data).toPromise();
  }
  edit(data): Promise<any> {
    return this.httpClient.post<any>(this.baseUrl + 'edit/' + data.id, data).toPromise();
  }
}

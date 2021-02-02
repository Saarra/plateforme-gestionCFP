import { Injectable } from '@angular/core';
import { Cvformateur } from '../Model/cvformateur';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private cvformateurs: Cvformateur[];
  baseURL = environment.URL +'auth/cv/'
  constructor(private httpClient: HttpClient) {
    this.cvformateurs = [
      new Cvformateur(1, 'assets/images/cv1.jpg' , 'Sellaouti', 'aymen', 36, 'Ariana', 77777, 'Formateur Web'),
      new Cvformateur(2, 'assets/images/samar.jpg', 'Takia', 'samar', 24, 'Tunis',  1223, 'Formateur Mobile'),
      new Cvformateur(3, '', 'test', 'test', 20, 'Tunis',  1223, 'Test pipe'),
    ];
  }
  getFormateurs(): Promise<Cvformateur[]> {
    return this.httpClient.get<Cvformateur[]>(this.baseURL).toPromise();
  }
  save(data): Promise<any> {
    return this.httpClient.post<any>(this.baseURL+'save', data).toPromise();
  }
  update(data): Promise<any> {
    return this.httpClient.post<any>(this.baseURL+'edit/'+ data.id, data).toPromise();
  }
  getByFormateur(idFormateur): Promise<Cvformateur[]> {
    return this.httpClient.get<Cvformateur[]>(this.baseURL+'getByFormateur/'+ idFormateur).toPromise();
  }
}

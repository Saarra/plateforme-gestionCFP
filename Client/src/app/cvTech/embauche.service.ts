import { Injectable } from '@angular/core';
import { Cvformateur } from '../Model/cvformateur';
import { ToastrService } from 'ngx-toastr';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmbaucheService {
  cvformateurs: Cvformateur[];
  baseURL = environment.URL +'auth/cv/';
  constructor(
    private toastr: ToastrService, private httpClient: HttpClient) {
    this.cvformateurs = [];
   }
  getEmbauchees(): Promise<Cvformateur[]> {
    return this.httpClient.get<Cvformateur[]>(this.baseURL+'embauchees').toPromise();
  }

  embauchee(cvformateur: Cvformateur): Promise<any> {
      return this.httpClient.get<any>(this.baseURL +'embauchee/' +cvformateur.idFormateur).toPromise()
  }
  deboucher(cvformateur): void {
    const index = this.cvformateurs.indexOf(cvformateur);
    if (index >= 0) {
      this.cvformateurs.splice(index, 1);
    }
  }
}

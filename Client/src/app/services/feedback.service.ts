import { Injectable } from '@angular/core';
import { Feedback } from '../Model/feedback';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  data: Feedback[];
  constructor(public http: HttpClient) { }

  read() {
    return this.http.get('http://localhost:8000/api/feedback');
  }

 insert(data: Feedback) {
   return this.http.post('http://localhost:8000/api/ajoutFeedback', data);
 }

 delete(id) {
   return this.http.delete('http://localhost:8000/api/supprimerFeedback/' + id);
 }
}

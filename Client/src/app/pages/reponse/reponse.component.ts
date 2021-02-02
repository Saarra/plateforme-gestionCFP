import { Component, OnInit } from '@angular/core';
import {FormationService} from '../../services/Formation/formation.service';
import {ApprenantService} from '../../services/apprenant.service';
import {TestService} from '../../services/Test/test.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css']
})
export class ReponseComponent implements OnInit {
  formations: any[] = [];
  tests: any[] = [];
  apprenants: any[] = [];
  reponses: any[] = [];
  idFormation: string;
  idTest: string=null;
  idUser: string=null

  constructor(private formateurService: FormationService,
              private testService: TestService,
              private apprenantService: ApprenantService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.formateurService.getByFormateur().then(formations=>{
      this.formations = formations.map(obj=>{
        return {
          id: obj.id,
          text: obj.nomFormation
        }
      })
    })
  }

  getTests(e){
    if(e){
      this.idFormation = e;
      this.testService.getByFormation(e).then(resp=>{
        this.tests= resp.map(obj=>{
          return {
            id: obj.id,
            text: obj.nomTest
          }
        })
      });
      this.apprenantService.getApprenantByFormation(e).then(resp=>{
        this.apprenants = resp.map(obj=>{
          return {
            id: obj.id,
            text: obj.firstname + ' ' + obj.name
          }
        })
      })
    }
  }

  getReponses(e) {
    if(e){
      this.idUser= e;
      if(this.idTest===null){
      this.toastrService.warning('Veuillez selectionner le test');

      }else{
        this.reponses =[]
        this.testService.getReponses(this.idTest, e).then(result=>{
          this.reponses = result;
        })
      }

    }
  }

  changeTest(e) {
    if(e){
      this.idTest= e;
      if(this.idUser!==null){
        this.reponses =[];
        this.testService.getReponses(e, this.idUser).then(result=>{
          this.reponses = result;
          if (result==null){
            this.toastrService.warning('L\'apprenant n\'a pas encore passé le test');
          }
        })
      }
    }

  }
}

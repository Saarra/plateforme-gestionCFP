import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Test} from '../../Model/test';
import {FormationService} from '../../services/Formation/formation.service';
import {Question} from '../../Model/question';
import {TestService} from '../../services/Test/test.service';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationService} from 'primeng';

@Component({
  selector: 'app-ajout-test',
  templateUrl: './ajout-test.component.html',
  styleUrls: ['./ajout-test.component.css']
})
export class AjoutTestComponent implements OnInit {
  form: FormGroup;
  test : Test= new Test();
  formations: any[] = [];
  question: Question = new Question();
  submitted:boolean = false;

  constructor(private formBuilder:FormBuilder, private formationService: FormationService,
              private testService: TestService, private toastr: ToastrService,
              private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {
    this.formationService.getByFormateur().then(resp=>{
      this.formations = resp.map(obj=>{
        return {
          id: obj.id,
          text: obj.nomFormation
        };
      })
    })
  }
  initialForm(){
    this.test = new Test();
    this.submitted = false;
  }

  deleteQuestion(i: number) {
    this.test.questions.splice(i, 1);
  }

  saveQuestion() {
    this.test.questions.push(this.question);
    this.question = new Question();
  }
  confirmSave() {
    this.confirmationService.confirm({
      message: 'Voulez-vous creér le test?',
      header: 'Creation Test',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
       this.save();
      },
      reject: () => {
      }
    });
  }
  save(){
    this.submitted = true;
    if(this.test.nomTest!=="" && this.test.idFormation!==''&&this.test.questions!=[]){
      this.testService.add(this.test).then(resp=>{
        if(resp.status === 'success'){
          this.toastr.success('Test est ajouté avec succès');
          this.initialForm();
        }
        else{
          this.toastr.error('Une erreur inattendue s’est produite!');
        }
      })
    }
  }
}

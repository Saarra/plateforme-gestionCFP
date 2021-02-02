import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TestService} from '../../services/Test/test.service';
import {Test} from '../../Model/test';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationService} from 'primeng';
import {AuthentificationService} from '../../services/authentification.service';
import {User} from '../../services/auth.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  test : Test = new Test();
  user : User;
  constructor(private activatedRoute: ActivatedRoute,private testService: TestService,
              private confirmationService: ConfirmationService,
              private authentificationService: AuthentificationService,
              private router: Router) { }

  ngOnInit(): void {
    let id =this.activatedRoute.snapshot.paramMap.get('idTest');
    this.testService.getByID(id).then(resp=>{
      this.test = resp[0];
    });
    this.authentificationService.profileUser().subscribe(resp=>{
      this.user= resp;
    })
  }

  save() {
    this.confirmationService.confirm({
      message: 'Voulez-vous envoyez les reponses?',
      header: 'Test ' + this.test.nomTest,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.testService.passerTest(this.test, this.user.id).then(resp=>{
          if(resp.status === 'success'){
            this.router.navigateByUrl('tests');
          }
        })
      },
      reject: () => {
      }
    });
  }
}

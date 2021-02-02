import { Component, OnInit } from '@angular/core';
import {User} from '../../services/auth.service';
import {FormationService} from '../../services/Formation/formation.service';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationService} from 'primeng';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material';
import {AuthentificationService} from '../../services/authentification.service';
import {TestService} from '../../services/Test/test.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  cols = [
    {field: 'action', header: 'Action', class: 'ui-p-1'},
    {field: 'nomTest', header: 'Test', class: 'ui-p-3'},
    {field: 'nomFormation', header: 'Formation', class: 'ui-p-3'},
    {field: 'formateur', header: 'Formateur', class: 'ui-p-4'},
  ];
  loading: boolean = false;
  user: User;
  data: any[] = [];
  constructor( private router:Router, private toastr: ToastrService,
               private confirmationService: ConfirmationService, private authentificationService: AuthentificationService,
               private testService: TestService) { }

  ngOnInit(): void {
    this.authentificationService.profileUser().subscribe(resp=>{
      this.user= resp;
      this.getByapprenant();
    })
  }


  getByapprenant(){
    this.testService.getByApprenant(this.user.id).then(result=>{
      this.data = result;
    })
  }

  goToTest(rowData) {
    this.testService.testPassed(rowData.id, this.user.id).then(resp=>{
      if(resp===false){
        this.router.navigateByUrl('quiz/'+ rowData.id)
      }else{
        this.toastr.warning('vous avez déja passez ce test')
      }
    })
  }
}

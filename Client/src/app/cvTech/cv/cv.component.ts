import { Component, OnInit } from '@angular/core';
import { Cvformateur } from 'src/app/Model/cvformateur';
import { CvService } from '../cv.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  cvformateurs: Cvformateur[]=[];
  selectedFormateur: Cvformateur ;
  constructor(private cvServive: CvService) {

  }

  ngOnInit() {
    console.log(this.selectedFormateur)
       this.getCVs();
  }
  getCVs(){
    this.cvServive.getFormateurs().then(resp =>{
      if(this.selectedFormateur === undefined && resp.length !== 0){
        this.selectedFormateur = resp[0];
      }
      this.cvformateurs = resp;
    });
  }
  SelectFormateur(cvformateur) {
    this.selectedFormateur = cvformateur;
  }

}

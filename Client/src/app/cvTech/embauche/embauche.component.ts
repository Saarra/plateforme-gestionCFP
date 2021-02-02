import { Component, OnInit } from '@angular/core';
import { Cvformateur } from 'src/app/Model/cvformateur';
import { EmbaucheService } from '../embauche.service';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-embauche',
  templateUrl: './embauche.component.html',
  styleUrls: ['./embauche.component.css']
})
export class EmbaucheComponent implements OnInit {
  cvformateurs: Cvformateur[];
  pathImage = environment.publicUrl +'/images/'
  constructor(
    private embaucheService: EmbaucheService) {

    }
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.embaucheService.getEmbauchees().then(resp=>{
      this.cvformateurs = resp;
    });
  }
}

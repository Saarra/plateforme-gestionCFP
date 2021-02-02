import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Cvformateur } from 'src/app/Model/cvformateur';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-item-cv',
  templateUrl: './item-cv.component.html',
  styleUrls: ['./item-cv.component.css']
})
export class ItemCvComponent implements OnInit {


  @Input() cvformateur: Cvformateur = new Cvformateur();
  @Output() selectedFormateur = new EventEmitter();
  pathImage = environment.publicUrl + 'images/'
  constructor() { }

  ngOnInit(): void {
  }
    //Todo emmetre un event et injecter la formateur

  selectFormateur() {
   this.selectedFormateur.emit(this.cvformateur);
  }

}

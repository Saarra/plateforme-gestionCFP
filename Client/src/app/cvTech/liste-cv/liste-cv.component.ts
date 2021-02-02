import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Cvformateur } from 'src/app/Model/cvformateur';

@Component({
  selector: 'app-liste-cv',
  templateUrl: './liste-cv.component.html',
  styleUrls: ['./liste-cv.component.css']
})
export class ListeCvComponent implements OnInit {


  @Input() cvformateurs: Cvformateur[] = [];
  @Output() selectedFormateur = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(this.cvformateurs)
  }
  selectFormateur(selectedFormateur) {
    // console.log(selectedFormateur);
    this.selectedFormateur.emit(
      selectedFormateur
    );
  }
}

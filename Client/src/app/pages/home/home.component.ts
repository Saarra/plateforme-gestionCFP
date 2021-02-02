import { Component, OnInit } from '@angular/core';
import {FormationService} from '../../services/Formation/formation.service';
import {Formation} from '../../Model/formation';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}

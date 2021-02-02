import {Component, OnInit, Input, ViewChild, forwardRef} from '@angular/core';
import { Cvformateur } from 'src/app/Model/cvformateur';
import { EmbaucheService } from '../embauche.service';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {EmbaucheComponent} from '../embauche/embauche.component';

@Component({
  selector: 'app-detail-cv',
  templateUrl: './detail-cv.component.html',
  styleUrls: ['./detail-cv.component.css']
})
export class DetailCvComponent implements OnInit {
  @Input() cvformateur: Cvformateur;
  pathImage = environment.publicUrl + 'images/';
  @ViewChild(forwardRef(() => EmbaucheComponent), {static:true}) tab: EmbaucheComponent;
  constructor(private toastr: ToastrService, private embaucheService: EmbaucheService) { }

  ngOnInit(): void {
  }

  embaucher() {
    this.embaucheService.embauchee(this.cvformateur).then(resp => {
      if (resp.status === 'success') {
        this.tab.getAll();
        this.toastr.success('Parfait', 'Le formateur est embauché');
      }
      else if (resp.status === 'exist'){
        this.toastr.warning('Désolé',  'Ce formateur est déjà séléctionnée');
      }
      else{
        this.toastr.error('Désolé',  'Ce formateur est déjà séléctionnée');
      }
    })

  }

}

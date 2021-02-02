import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Apprenant } from 'src/app/Model/apprenant';
import {Formateur} from '../../Model/formateur';
import {FormateurService} from '../../services/formateur.service';
import {RoleService} from '../../services/Role/role.service';
import {ToastrService} from 'ngx-toastr';
import {ProfileService} from '../../services/profile/profile.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  UserProfile: Apprenant = new Apprenant();
  BASE_URLPieceJointe = environment.publicUrl + 'images/';

  constructor(public authService: AuthentificationService, private service: ProfileService,
               private toastr: ToastrService) {

}

  ngOnInit() {
    this.authService.profileUser().subscribe((data: Apprenant) => {
      this.UserProfile = data;
    });
  }

  update() {
    const obj = this.UserProfile;
  console.log(obj);
    this.service.update(obj).subscribe( (res: any) => {
      if (res.id) {
        this.UserProfile = res;
      }
      this.toastr.warning('Profile modifié avec succès!');
    });
  }

  onSelectedFile(evt) {
    var files = evt.target.files;
    var reader = new FileReader();
    let that = this;
    reader.onload = function (frEvent: any) {
      that.UserProfile.image = frEvent.target.result;
    };
    reader.readAsDataURL(files[0]);

  }
}

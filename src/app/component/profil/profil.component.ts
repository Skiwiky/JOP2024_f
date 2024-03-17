import { Component } from '@angular/core';
import { SPORTS_LIST } from 'src/app/Data/SPORTS_LIST';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  user: User = new User();
  listSport = SPORTS_LIST;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.user = this.userService.getUserDetails()
   
  }

  updateUser() {
    
  }
}

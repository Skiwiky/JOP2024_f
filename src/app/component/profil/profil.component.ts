import { Component } from '@angular/core';
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

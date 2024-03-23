import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SPORTS_LIST } from 'src/app/Data/SPORTS_LIST';
import { Adress } from 'src/app/model/Adress';
import { DataBank } from 'src/app/model/DataBank';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  user: User = new User();
  listSport = SPORTS_LIST;

  isModified: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private userService: UserService, 
    private loginService: LoginService, 
    private router: Router,
    private storageService: StorageService) {}

  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails() {
   this.storageService.toString();
    const storedUserData = JSON.parse(this.storageService.getItem('user'));
    if (storedUserData) {
      this.user =storedUserData;
    } else {
      this.redirectToLogin();
      console.log('Aucune donnée utilisateur stockée trouvée. Veuillez vous connecter.');
    }
  }

  //Mise a jour de l'utilisateur
  updateUser() {
    if (!this.loginService.isLoggedIn()) {
      this.redirectToLogin();
      return;
    }
    const userId = Number(this.storageService.getItem('idUser'));
    
    console.log("Update user: " + this.user);
    this.userService.updateUser(userId, this.user).subscribe({
      next: (response) => {
        this.showAlert = false; 
        this.updateFrontWithNewUserData(response); 
      },
      error: (error) => {
        this.showAlert = true;
    if (error.status === 404) {
        this.alertMessage = 'Utilisateur non trouvé.';
    } else {
        this.alertMessage = 'Une erreur est survenue lors de la mise à jour du profil.';
    }
      }
    });
  }

  addAdressFacturation() {
      if (!this.user.adressFacturation) {
          this.user.adressFacturation = new Adress();
      }
  }

  deleteAdressFacturation() {
      this.user.adressFacturation = null;
  }

  addDataBank() {
      if (!this.user.dataBank) {
          this.user.dataBank = new DataBank();
      }
  }

  deleteDataBank() {
      this.user.dataBank = null;
  }

  onFieldChange() {
    this.isModified = true;
}
  

  

  redirectToLogin() {
    this.router.navigate(['/connexion']);
  }

  updateFrontWithNewUserData(updatedUser: User) {
    this.storageService.setItem('user', JSON.stringify(updatedUser));
    this.user = updatedUser;
    }
}

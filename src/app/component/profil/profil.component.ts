import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SPORTS_LIST } from 'src/app/Data/SPORTS_LIST';
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
    private storageService: StorageService) {
    }

  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails() {
    const storedUserData = JSON.parse(this.storageService.getItem('user'));
    console.log(storedUserData);
    if (storedUserData) {
      this.user = storedUserData;
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
    if (this.user.dataBanks) {
      this.user.dataBanks.dataSaved = true;
    } 

    console.log(`Update user: ${JSON.stringify(this.user)}`);
    
    const userId = Number(this.storageService.getItem('idUser'));
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

  deleteUser(){
    console.log("suppression du User");
  }

  addDataBank() {
      if (!this.user.dataBanks) {
          this.user.dataBanks = new DataBank();
      }
  }

  deleteDataBank() {
      this.user.dataBanks = null;
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SPORTS_LIST, Sport } from 'src/app/Data/SPORTS_LIST';
import { Billet } from 'src/app/model/Billet';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: User = new User();
  listSport = SPORTS_LIST;
  selectedSport: string = '';
  filteredBillets: Billet[] = [];
  sportsList: Sport[] = SPORTS_LIST;
  isModified: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';
  /*modal*/
  showModal: boolean = false;
  selectedBillet: Billet | null = null;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.storageService.cleanExpiredLocalStorageItems();
  }

  ngOnInit() {
    this.loadUserDetails();
    this.filterBillets();
  }

  loadUserDetails() {
    const storedUserData = JSON.parse(this.storageService.getItemWithExpiry('user') || '{}');
    console.log(storedUserData);
    if (storedUserData && storedUserData.billets) {
      this.user = storedUserData;
      this.filterBillets();
    } else {
      this.redirectToLogin();
      console.log('Aucune donnée utilisateur stockée trouvée. Veuillez vous connecter.');
    }
  }

  // Mise à jour de l'utilisateur
  updateUser() {
    if (!this.loginService.isLoggedIn()) {
      this.redirectToLogin();
      return;
    }

    const userId = Number(this.storageService.getItemWithExpiry('idUser'));
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

  deleteUser() {
    console.log("suppression du User");
  }

  onFieldChange() {
    this.isModified = true;
  }

  redirectToLogin() {
    this.router.navigate(['/connexion']);
  }

  updateFrontWithNewUserData(updatedUser: User) {
    this.storageService.setItemWithExpiry('user', JSON.stringify(updatedUser), 604800000); // on stocke une semaine
    this.user = updatedUser;
    this.filterBillets();
  }

  /* Gestion de la modale */
  openModal(billet: Billet): void {
    this.selectedBillet = billet;
    document.querySelector('.bloc-partie')?.classList.add('blur-background');
  }

  closeModal(): void {
    this.selectedBillet = null;
    document.querySelector('.bloc-partie')?.classList.remove('blur-background');
  }

  filterBillets(): void {
    if (this.user && this.user.billets) {
      this.filteredBillets = this.selectedSport 
        ? this.user.billets.filter(billet => billet.sport === this.selectedSport)
        : this.user.billets;
    }
  }
}
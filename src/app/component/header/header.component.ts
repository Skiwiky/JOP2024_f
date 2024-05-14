import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  urlLogoJO: string = '../../../assets/img/Logo_JO24.svg';
  urlLogoJP: string = '../../../assets/img/Logo_JP24.svg';
  logoAffiche: string;
  evenement: string = 'Olympiques';
  isUserLogged: boolean = false;
  user: User = new User(0, '', '', '', '', '', '');

  constructor(
    public loginService: LoginService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.storageService.cleanExpiredLocalStorageItems();
    this.logoAffiche = this.urlLogoJO;
  }

  ngOnInit(): void {
    const userData = this.storageService.getItemWithExpiry('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.isUserLogged = true;
    } else {
      this.isUserLogged = false;
    }
    console.log(this.user);

    // Alternance des logos
    setInterval(() => {
      if (this.evenement === 'Olympiques') {
        this.logoAffiche = this.urlLogoJP;
        this.evenement = 'Paralympiques';
      } else {
        this.logoAffiche = this.urlLogoJO;
        this.evenement = 'Olympiques';
      }
    }, 10000);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/connexion']);
    this.isUserLogged = false;
    this.user = new User(0, '', '', '', '', '', '');
  }

  goHome() {
    this.router.navigate(['/']);
  }
}

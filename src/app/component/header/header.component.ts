import { Component } from '@angular/core';
import { AuthGuardService } from 'src/app/services/authGuard/auth-guard.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  urlLogoJO: string = '../../../assets/img/Logo_JO24.svg';
  urlLogoJP: string = '../../../assets/img/Logo_JP24.svg';
  logoAffiche: string;
  evenement: string = 'Olympiques';

  constructor(private loginService: LoginService) {
    this.logoAffiche = this.urlLogoJO;
  }
  ngOnInit(): void {
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
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  urlLogoJO: string = '../../../assets/img/Logo_JO24.svg';
  urlLogoJP: string = '../../../assets/img/Logo_JP24.svg';
  logoAffiche: string;

  constructor() {
    this.logoAffiche = this.urlLogoJO;
  }

  
}

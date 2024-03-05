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
  evenement: string = 'Olympiques';

  constructor() {
    this.logoAffiche = this.urlLogoJO;
  }
  ngOnInit(): void {
    //this.startCompteur();
    setInterval(() => {
      // Change l'événement toutes les 30 secondes
      if (this.evenement === 'Olympiques') {
        this.logoAffiche = this.urlLogoJP;
        this.evenement = 'Paralympiques';
      } else {
        this.logoAffiche = this.urlLogoJO;
        this.evenement = 'Olympiques';
      }
    }, 10000); 
  }

}

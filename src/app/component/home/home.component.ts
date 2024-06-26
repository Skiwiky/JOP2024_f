import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  dateDebutJO = new Date('July 26, 2024 00:00:00').getTime();
  dateDebutJP = new Date('August 28, 2024 00:00:00').getTime();
  dateEvent: number;
  jour: number;
  heure: number;
  minutes: number;
  seconds: number;
  evenement: string = 'Olympiques';

  
  constructor(private storageService: StorageService) {
    this.jour = 0;
    this.heure = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.dateEvent = this.dateDebutJO;
    this.storageService.cleanExpiredLocalStorageItems();
  }

  ngOnInit(): void {
    this.startCompteur();
    setInterval(() => {
  
      if (this.evenement === 'Olympiques') {
        this.dateEvent = this.dateDebutJP;
        this.evenement = 'Paralympiques';
      } else {
        this.dateEvent = this.dateDebutJO;
        this.evenement = 'Olympiques';
      }
    }, 10000); 
  }

  startCompteur(): void {
    const interval = setInterval(() => {
      const dateJour = new Date().getTime();
      const distance = this.dateEvent - dateJour;

      this.jour = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.heure = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        console.log('Les Jeux ${this.evenement} de Paris 2024 ont commencé !');
      }
    }, 1000);
  }

  redirectToOfficialSite(): void {
    window.location.href = 'https://www.paris2024.org'; 
  }
}

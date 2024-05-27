import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier/panier.service';

@Component({
  selector: 'app-verif-reservation',
  templateUrl: './verif-reservation.component.html',
  styleUrls: ['./verif-reservation.component.css']
})
export class VerifReservationComponent {
  shortKey: string = '';
  isReservationValid: boolean | null = null;
  alertMessage: string = '';

  constructor(
    private router: Router,
    private panierService: PanierService
  ) { }

  checkShortKey(): void {
    if (!this.shortKey) {
      this.alertMessage = 'Veuillez entrer une ShortKey.';
      this.isReservationValid = false;
      return;
    }

    this.panierService.checkShortKey(this.shortKey).subscribe({
      next: (user) => {
        this.isReservationValid = true;
        this.alertMessage = `La réservation est valide. Clé de réservation: ${user.lastName}`;
      },
      error: (error) => {
        this.isReservationValid = false;
        this.alertMessage = error.status === 404 ? 'La réservation est invalide.' : 'Erreur lors de la vérification de la réservation.';      }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}

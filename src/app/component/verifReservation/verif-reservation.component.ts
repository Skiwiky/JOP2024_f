import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/model/UserDTO';
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
  user: UserDTO = new UserDTO('','','','','',[]);

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
      next: (user:UserDTO) => {
        this.isReservationValid = true;
        const filteredBillets = user.billets.filter(billet => billet.shortKey === this.shortKey);

        if (filteredBillets.length > 0) {
          this.isReservationValid = true;
          this.user = {
            ...user,
            billets: filteredBillets
          };
        this.alertMessage = `La réservation est valide. Clé de réservation: ${user.lastName}`;
      }
    },
      error: (error) => {
        this.isReservationValid = false;
        this.alertMessage = error.status === 404 ? 'Erreur lors de la vérification de la réservation.':'La réservation est invalide.';      }
    });
  }
  onInputChange() {
    this.isReservationValid = false;
    this.alertMessage = '';
    this.user = new UserDTO('','','','','',[]);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}

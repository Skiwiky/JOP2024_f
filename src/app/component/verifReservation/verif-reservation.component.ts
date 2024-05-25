import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier/panier.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-verif-reservation',
  templateUrl: './verif-reservation.component.html',
  styleUrl: './verif-reservation.component.css'
})
export class VerifReservationComponent {
  reservationKey: string | null = null;
  isReservationValid: boolean | null = null;
  alertMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private panierService: PanierService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.reservationKey =this.storageService.getItemWithExpiry('reservationKey');
    if (this.reservationKey) {
      this.checkReservation(this.reservationKey);
    } else {
      this.alertMessage = 'No reservation key found.';
      this.isReservationValid = false;
    }
  }

  checkReservation(reservationKey: string): void {
    this.panierService.checkReservationKey(reservationKey).subscribe({
      next: (exists) => {
        this.isReservationValid = exists;
        this.alertMessage = exists ? 'La réservation est valide.' : 'La réservation est invalide.';
      },
      error: (error) => {
        this.alertMessage = 'Erreur lors de la vérification de la réservation.';
        console.error(error);
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}

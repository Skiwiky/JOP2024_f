import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Billet } from 'src/app/model/Billet';
import { BilletDisponible } from 'src/app/model/BilletDisponibles';
import { DataBank } from 'src/app/model/DataBank';
import { Reservation } from 'src/app/model/Reservation';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import { PanierService } from 'src/app/services/panier/panier.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { BillerDispoToBilletService } from 'src/app/services/utils/biller-dispo-to-billet.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  user: User = new User();
  dataBanks = new DataBank();
  panier: BilletDisponible[] = [];
  totalPanier: number = 0;
  reservation = new Reservation();
  billets: Billet[] = [];

  constructor(
    private router:Router,
    public loginService: LoginService, 
    private storageService: StorageService,
    private panierService: PanierService,
  private billetDispoToBillet: BillerDispoToBilletService){
      this.storageService.cleanExpiredLocalStorageItems();

  }

  ngOnInit() {
  this.loadUserDetails();
  this.loadPanier();
  }

  loadUserDetails() {
    const storedUserData = JSON.parse(this.storageService.getItemWithExpiry('user'));
   
    if(this.loginService.isLoggedIn()){
      if (storedUserData) {
        this.user = storedUserData;
        if(this.user.dataBanks){
          this.dataBanks = this.user.dataBanks;
        }
      }
    } else {
      this.router.navigate(['/connexion']);
      console.log('Aucune donnée utilisateur stockée trouvée. Veuillez vous connecter.');
    }
  }


  loadPanier() {
    const storedPanier = this.storageService.getItemWithExpiry('panier');
    console.log(storedPanier);
    if (storedPanier) {
      this.panier = JSON.parse(storedPanier);
      this.updateTotal();  
    } else {
      console.log('Aucun panier stocké trouvé.');
      this.panier = [];
    }
  }

  updateTotal() {
    this.totalPanier = this.panier.reduce((som, billet) => som + billet.prix, 0);
  }

  removeFromCart(billetToRemove: BilletDisponible): void {
    const index = this.panier.findIndex(billet => billet === billetToRemove);
    if (index > -1) {
        this.panier.splice(index, 1);
        this.storageService.setItemWithExpiry('panier', JSON.stringify(this.panier), 604800000); 
    }
    this.updateTotal();
  }

  validePanier() {
    this.billets = this.billetDispoToBillet.transformBilletsDisponiblesToBillets(JSON.parse(this.storageService.getItemWithExpiry('panier')))
    this.reservation = new Reservation(
      undefined,
      this.user,
      this.billets,
      new Date(),
      true
    );
    this.panierService.createReservation(this.reservation).subscribe({
      next: (res) => {
        alert('Réservation créée avec succès!');
      },
      error: (err) => {
        alert('Erreur lors de la création de la réservation');
      }
    });
  }
}

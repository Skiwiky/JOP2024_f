import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UnsubscriptionError } from 'rxjs';
import { Billet } from 'src/app/model/Billet';
import { BilletDisponible } from 'src/app/model/BilletDisponibles';
import { DataBank } from 'src/app/model/DataBank';
import { UserPaiementDTO } from 'src/app/model/UserPaiementDTO';
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
  dataBanks: DataBank = new DataBank();
  panier: BilletDisponible[] = [];
  totalPanier: number = 0;
  billets: Billet[] = [];
  userPaimentDTO: UserPaiementDTO = new UserPaiementDTO();

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
    this.user = JSON.parse(this.storageService.getItemWithExpiry('user'));
    this.user.billets = this.billets;
    console.log("user" + this.user);
    this.userPaimentDTO = new UserPaiementDTO(
      this.user,
      this.dataBanks
    );
    this.panierService.createReservation(this.userPaimentDTO).subscribe({
      next: (res) => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Erreur lors de la création de la réservation');
      }
    });
  }
}

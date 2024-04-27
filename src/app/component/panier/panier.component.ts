import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BilletDisponible } from 'src/app/model/BilletDisponibles';
import { DataBank } from 'src/app/model/DataBank';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login/login.service';
import { StorageService } from 'src/app/services/storage/storage.service';

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


  constructor(
    private router:Router,
    
    private loginService: LoginService, 
    private storageService: StorageService){
      this.storageService.cleanExpiredLocalStorageItems();

  }

  ngOnInit() {
  this.loadUserDetails();
  this.loadPanier();
  }

  loadUserDetails() {
    const storedUserData = JSON.parse(this.storageService.getItemWithExpiry('user'));
    if (storedUserData) {
      this.user = storedUserData;
      if(this.user.dataBanks){
      this.dataBanks = this.user.dataBanks;
      }
    } else {
      this.router.navigate(['/home']);
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

  checkout() {
   //lancer appel pour payer   
  }
}

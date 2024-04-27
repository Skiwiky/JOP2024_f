import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CATEGORY } from 'src/app/Data/CATEGORY';
import { CITY } from 'src/app/Data/CITY';
import { SPORTS_LIST, Sport } from 'src/app/Data/SPORTS_LIST';
import { BilletDisponible, BilletStatut } from 'src/app/model/BilletDisponibles';
import { User } from 'src/app/model/User';
import { BilletDisponibleService } from 'src/app/services/billetDisponible/billet-disponible.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  selectedSport: string = '';
  selectedCity: string = '';
  selectedCategory: string = '';
  filteredBillets: BilletDisponible[] = [];
  billets: BilletDisponible[] = [];
  billetStatut = BilletStatut;
  sportsList: Sport[] = SPORTS_LIST;
  cities = CITY;
  categorys = CATEGORY;
  user: User = new User();
  panier: BilletDisponible[] = [];
  totalPanier: number = 0;

  constructor( private billetService: BilletDisponibleService,
            private router:Router,
            private storageService: StorageService ){
              this.storageService.cleanExpiredLocalStorageItems();

  }
  ngOnInit() {
    this.loadUserDetails();
    this.loadBillets();
    this.loadPanier();
  }

  filterBillets() {
    console.log("test listener");
    this.filteredBillets = this.billets.filter((billet) => {
      return (this.selectedSport ? billet.sport === this.selectedSport : true) &&
             (this.selectedCity ? billet.localisation === this.selectedCity : true);
      // Add des autres filtres 
    });
  }

  loadUserDetails() {
    const storedUserData = JSON.parse(this.storageService.getItemWithExpiry('user'));
    if (storedUserData) {
      this.user = storedUserData;
    } else {
      this.router.navigate(['/home']);
      console.log('Aucune donnée utilisateur stockée trouvée. Veuillez vous connecter.');
    }
  }

  loadBillets(): void {
    this.billetService.getBilletsDisponibles({}).subscribe(billets => {
      this.billets = billets; 
      this.filterBillets();
      console.log('Billets chargés:', this.billets);
    }, error => {
      console.error('Erreur lors du chargement des billets:', error);
    });
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

  addToCart(billet: BilletDisponible) {
    this.panier.push(billet);
    this.updateTotal();
    this.storageService.setItemWithExpiry('panier', JSON.stringify(this.panier), 604800000 ); //une semaine
  }

  updateTotal() {
    this.totalPanier = this.panier.reduce((som, billet) => som + billet.prix, 0);
  }

  checkout() {
    this.router.navigate(['/panier']);  
  }

 removeFromCart(billetToRemove: BilletDisponible): void {
    const index = this.panier.findIndex(billet => billet === billetToRemove);
    if (index > -1) {
        this.panier.splice(index, 1);
        this.storageService.setItemWithExpiry('panier', JSON.stringify(this.panier), 604800000); 
    }
    this.updateTotal();
  }
}

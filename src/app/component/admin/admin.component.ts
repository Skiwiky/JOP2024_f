import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CATEGORY } from 'src/app/Data/CATEGORY';
import { CITY } from 'src/app/Data/CITY';
import { SPORTS_LIST, Sport } from 'src/app/Data/SPORTS_LIST';
import { Billet } from 'src/app/model/Billet';
import { BilletDisponible, BilletStatut } from 'src/app/model/BilletDisponibles';
import { User } from 'src/app/model/User';
import { BilletService } from 'src/app/services/billet/billet.service';
import { BilletDisponibleService } from 'src/app/services/billetDisponible/billet-disponible.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  billetForm: FormGroup;
  selectedSport: string = '';
  selectedCity: string = '';
  filteredBilletsDisponible: BilletDisponible[] = [];
  billetsDisponible: BilletDisponible[] = [];
  billetStatut = BilletStatut;
  sportsList: Sport[] = SPORTS_LIST;
  cities = CITY;
  categorys = CATEGORY;
  user: User = new User();


  // Initialisation de l'onglet actif
  activeTab: 'form' | 'dashboard' = 'form';
  billets: Billet[] = [];
  prixTotalBilletVendu: number = 0;
  nbBilletSolo: number = 0;
  nbBilletDuo: number = 0;
  nbBilletFamille: number = 0;

  setActiveTab(tab: 'form' | 'dashboard'): void {
    this.activeTab = tab;
  }


  constructor(private fb: FormBuilder, 
            private billetService: BilletDisponibleService,
            private router:Router,
            private billetDispoService: BilletDisponibleService,
            private storageService: StorageService,
            private billetsService: BilletService ) {
              this.loadUserDetails();
              this.storageService.cleanExpiredLocalStorageItems();

    this.billetForm = this.fb.group({
        sport: [this.sportsList[0].id, Validators.required],
        localisation: [CITY.VIDE, Validators.required],
        dateEvent: ['', Validators.required],
        category: [CATEGORY.VIDE, Validators.required],
        statut: [BilletStatut.VIDE, Validators.required],
        prix: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadBilletsDisponible();
    this.loadAllBillets();
  }

  filterBillets() {
    console.log("test listener");
    this.filteredBilletsDisponible = this.billetsDisponible.filter((billet) => {
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

  addBillet() {
      if (this.billetForm.valid) {
          const newBillet = new BilletDisponible(
              0, 
              this.billetForm.value.sport,
              this.billetForm.value.localisation,
              this.billetForm.value.dateEvent,
              this.billetForm.value.category,
              this.billetForm.value.statut,
              this.billetForm.value.prix,
          );

          this.billetDispoService.createBilletDisponible(newBillet).subscribe({
            next: (response) => {
              console.log('Billet créé', response);
              this.billetForm.reset({ statut: BilletStatut.IN_SOLD }); 
              this.loadBilletsDisponible();
            },
            error: (error) => console.error('Erreur lors de la création', error)
          });
          console.log('Billet ajouté:', newBillet);
          
      }
  }

  deactivateBillet(billet: BilletDisponible) {
      const found = this.billetsDisponible.find(b => b.id === billet.id);
      if (found) {
          found.statut = BilletStatut.DESACTIVED;
          console.log('Billet désactivé:', found);
      }
  }
  updateBillet(billet: BilletDisponible): void {
    this.billetService.updateBilletDisponible(billet.id, billet).subscribe(() => {
      this.loadBilletsDisponible(); 
    });
  }

  loadBilletsDisponible(): void {
    this.billetService.getBilletsDisponibles({}).subscribe(billets => {
      this.billetsDisponible = billets;
      this.filteredBilletsDisponible = this.billetsDisponible;
      console.log(this.billetsDisponible);
    });
  }

  loadAllBillets(): void {
    this.billetsService.getAllBillets().subscribe({
      next: (billets) => {
        this.billets = billets;
        this.calculPrixTotal(this.billets);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des billets:', error);
      }
    });
  }

  calculPrixTotal(billets: Billet[]){
    billets.forEach(element => {
        this.prixTotalBilletVendu += element.prix;
        if(element.category === "SOLO"){
          this.nbBilletSolo ++;
        }
        if(element.category === "DUO"){
          this.nbBilletDuo ++;
        }
        if(element.category === "FAMILLE"){
          this.nbBilletFamille ++;
        }
    });
  }
}


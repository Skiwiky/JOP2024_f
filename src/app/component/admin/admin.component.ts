import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CATEGORY } from 'src/app/Data/CATEGORY';
import { CITY } from 'src/app/Data/CITY';
import { SPORTS_LIST, Sport } from 'src/app/Data/SPORTS_LIST';
import { BilletDisponible, BilletStatut } from 'src/app/model/BilletDisponibles';
import { User } from 'src/app/model/User';
import { BilletDisponibleService } from 'src/app/services/billetDisponible/billet-disponible.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  billetForm: FormGroup;
  billets: BilletDisponible[] = [];
  billetStatut = BilletStatut;
  sportsList: Sport[] = SPORTS_LIST;
  cities = CITY;
  categorys = CATEGORY;
  user: User = new User();


  constructor(private fb: FormBuilder, 
            private billetService: BilletDisponibleService,
            private router:Router,
            private billetDispoService: BilletDisponibleService,
            private storageService: StorageService ) {
              this.loadUserDetails();
    this.billetForm = this.fb.group({
        sport: [this.sportsList[0].id, Validators.required],
        localisation: [CITY.VIDE, Validators.required],
        dateEvent: ['', Validators.required],
        category: [CATEGORY.VIDE, Validators.required],
        statut: [BilletStatut.VIDE, Validators.required]
    });
  }

  ngOnInit() {}
  loadUserDetails() {
    const storedUserData = JSON.parse(this.storageService.getItem('user'));
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
              this.billetForm.value.statut
          );

          this.billetDispoService.createBilletDisponible(newBillet);
          console.log('Billet ajouté:', newBillet);
          this.billetForm.reset({ statut: BilletStatut.IN_SOLD }); 
          this.router.navigate(['/admin']);
      }
  }

  deactivateBillet(billet: BilletDisponible) {
      const found = this.billets.find(b => b.id === billet.id);
      if (found) {
          found.statut = BilletStatut.DESACTIVED;
          console.log('Billet désactivé:', found);
      }
  }
  updateBillet(billet: BilletDisponible): void {
    this.billetService.updateBilletDisponible(billet.id, billet).subscribe(() => {
      this.loadBillets(); 
    });
  }

  loadBillets(): void {
    this.billetService.getBilletsDisponibles({}).subscribe(billets => {
      this.billets = billets;
    });
  }
}


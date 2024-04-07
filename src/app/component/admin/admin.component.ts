import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BilletDisponible, BilletStatut } from 'src/app/model/BilletDisponibles';
import { BilletDisponibleService } from 'src/app/services/billetDisponible/billet-disponible.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  billetForm: FormGroup;
  billets: BilletDisponible[] = [];
  billetStatut = BilletStatut;

  constructor(
    private fb: FormBuilder,
    private billetService: BilletDisponibleService
  ) {
    this.billetForm = this.fb.group({
      sport: ['', Validators.required],
      localisation: ['', Validators.required],
      dateEvent: ['', Validators.required],
      category: ['', Validators.required],
      statut: [BilletStatut.IN_SOLD, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBillets();
  }

  addBillet(): void {
    if (this.billetForm.valid) {
      this.billetService.createBilletDisponible(this.billetForm.value).subscribe(() => {
        this.loadBillets();
        this.billetForm.reset({
          statut: BilletStatut.IN_SOLD 
        });
      });
    }
  }

  updateBillet(billet: BilletDisponible): void {
    this.billetService.updateBilletDisponible(billet.id, billet).subscribe(() => {
      this.loadBillets(); 
    });
  }

  deactivateBillet(billet: BilletDisponible): void {
    billet.statut = BilletStatut.DESACTIVED;
    this.updateBillet(billet);
  }

  loadBillets(): void {
    this.billetService.getBilletsDisponibles({}).subscribe(billets => {
      this.billets = billets;
    });
  }
}


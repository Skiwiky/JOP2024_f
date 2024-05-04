import { Injectable } from '@angular/core';
import { Billet } from 'src/app/model/Billet';
import { BilletDisponible } from 'src/app/model/BilletDisponibles';

@Injectable({
  providedIn: 'root'
})
export class BillerDispoToBilletService {

  transformBilletsDisponiblesToBillets(billetsDisponibles: BilletDisponible[]): Billet[] {
    return billetsDisponibles.map(billetDisponible => this.transformSingleBilletDisponible(billetDisponible));
  }

  private transformSingleBilletDisponible(billetDisponible: BilletDisponible): Billet {
    const billet = new Billet();
    billet.id = 0; 
    billet.sport = billetDisponible.sport || 'Inconnu';  
    billet.localisation = billetDisponible.localisation || 'Non spécifiée';  
    billet.date = billetDisponible.dateEvent ? new Date(billetDisponible.dateEvent) : new Date();
    billet.price = billetDisponible.prix || 0;
    billet.categoryBillet = billetDisponible.category || 'Générale';
    billet.billetKey = ''; 
    billet.finalKey = ''; 

    return billet;
  }
}

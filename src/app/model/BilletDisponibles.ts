import { CITY } from "../Data/CITY";

export enum BilletStatut {
    VIDE = "Choisir un statut de vente",
    IN_SOLD = 'DISPONIBLE',
    DESACTIVED = 'DESACTIVER',
    SOLDOUT = 'VENDU',
  }
  
  export class BilletDisponible {
    id: number;
    sport: string;
    localisation: string;
    dateEvent: string; 
    category: string;
    statut: BilletStatut;
  
    constructor(
      id: number = 0,
      sport: string = '',
      localisation: CITY = CITY.VIDE,
      dateEvent: string = '',
      category: string = '',
      statut: BilletStatut = BilletStatut.IN_SOLD 
    ) {
      this.id = id;
      this.sport = sport;
      this.localisation = localisation;
      this.dateEvent = dateEvent;
      this.category = category;
      this.statut = statut;
    }
  }
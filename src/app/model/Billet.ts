import { Reservation } from "./Reservation";

export class Billet {
    id: number;
    sport: string;
    localisation: string;
    date: Date;
    billetKey: string;
    finalKey: string;
    price: number;
    categoryBillet: string;
    reservation?: Reservation; 
  
    constructor(
      id?: number,
      sport?: string,
      localisation?: string,
      date?: Date,
      billetKey?: string,
      finalKey?: string,
      price?: number,
      categoryBillet?: string,
      reservation?: Reservation,
    ) {
      this.id = id || 0;
      this.sport = sport || '';
      this.localisation = localisation || '';
      this.date = date || new Date;
      this.billetKey = billetKey || '';
      this.finalKey = finalKey || '';
      this.price = price || 0;
      this.categoryBillet = categoryBillet || '';
      this.reservation = reservation ;
    }
  }
  
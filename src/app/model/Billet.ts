export class Billet {
    id: number;
    sport: string;
    localisation: string;
    date: Date;
    billetKey: string;
    finalKey: string;
    price: number;
    categoryBillet: string;
    userId?: number; // Optionnel, dépend de si vous voulez stocker l'ID de l'utilisateur associé dans chaque billet
  
    constructor(
      id: number,
      sport: string,
      localisation: string,
      date: Date,
      billetKey: string,
      finalKey: string,
      price: number,
      categoryBillet: string,
      userId?: number
    ) {
      this.id = id;
      this.sport = sport;
      this.localisation = localisation;
      this.date = date;
      this.billetKey = billetKey;
      this.finalKey = finalKey;
      this.price = price;
      this.categoryBillet = categoryBillet;
      this.userId = userId;
    }
  }
  
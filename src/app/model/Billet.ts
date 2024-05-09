export class Billet {
  id: number;
  sport: string;
  localisation: string;
  dateEvent: Date; 
  category: string; 
  prix: number; 
  dateAchat: Date; 
  billetKey: string; 
  reservatioKey: string; 

  constructor(
      id: number = 0,
      sport: string = '',
      localisation: string = '',
      dateEvent: Date = new Date(),
      category: string = '',
      prix: number = 0,
      dateAchat: Date = new Date(),
      billetKey: string = '',
      reservatioKey: string = ''
  ) {
      this.id = id;
      this.sport = sport;
      this.localisation = localisation;
      this.dateEvent = dateEvent;
      this.category = category;
      this.prix = prix;
      this.dateAchat = dateAchat;
      this.billetKey = billetKey;
      this.reservatioKey = reservatioKey;
  }
}

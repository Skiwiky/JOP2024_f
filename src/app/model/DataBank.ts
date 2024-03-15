export class DataBank {
    id: number;
    userId?: number; // Optionnel, si vous souhaitez conserver une référence à l'utilisateur associé
    dataSaved: boolean;
    nameCard: string;
    numberCard: string;
    keyCard: string;
    dateClosed: string; // Vous pouvez utiliser `Date` si vous préférez travailler avec des objets Date
  
    constructor(
      id: number,
      dataSaved: boolean,
      nameCard: string,
      numberCard: string,
      keyCard: string,
      dateClosed: string,
      userId?: number
    ) {
      this.id = id;
      this.userId = userId;
      this.dataSaved = dataSaved;
      this.nameCard = nameCard;
      this.numberCard = numberCard;
      this.keyCard = keyCard;
      this.dateClosed = dateClosed;
    }
  }
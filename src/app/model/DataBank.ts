export class DataBank {
    id: number;
    dataSaved: boolean;
    nameCard: string;
    numberCard: string;
    keyCard: string;
    dateClosed: string;
  
    constructor(
      id?: number,
      dataSaved?: boolean,
      nameCard?: string,
      numberCard?: string,
      keyCard?: string,
      dateClosed?: string,
    ) {
      this.id = id || 0;
      this.dataSaved = dataSaved || false;
      this.nameCard = nameCard || '';
      this.numberCard = numberCard || '';
      this.keyCard = keyCard || '';
      this.dateClosed = dateClosed || '';
    }
  }
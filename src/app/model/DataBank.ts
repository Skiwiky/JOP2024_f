export class DataBank {
    id: number;
    userId?: number; 
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
      userId?: number
    ) {
      this.id = id || 0;
      this.userId = userId || 0;
      this.dataSaved = dataSaved || false;
      this.nameCard = nameCard || '';
      this.numberCard = numberCard || '';
      this.keyCard = keyCard || '';
      this.dateClosed = dateClosed || '';
    }
  }
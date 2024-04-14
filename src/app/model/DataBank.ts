export class DataBank {
    id: number;
    dataSaved: boolean;
    nameCard: string;
    numberCard: string;
    cvv: string;
    dateClosed: string;
  
    constructor(
      id?: number,
      dataSaved?: boolean,
      nameCard?: string,
      numberCard?: string,
      cvv?: string,
      dateClosed?: string,
    ) {
      this.id = id || 0;
      this.dataSaved = dataSaved || false;
      this.nameCard = nameCard || '';
      this.numberCard = numberCard || '';
      this.cvv = cvv || '';
      this.dateClosed = dateClosed || '';
    }
  }
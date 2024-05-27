export class BilletDTO {
    sport: string;
    localisation: string;
    dateEvent: Date;
    category: string;
    prix: number;
    dateAchat: Date;
    reservationKey: string;
    shortKey: string;

    constructor(
        sport: string,
        localisation: string,
        dateEvent: Date,
        category: string,
        prix: number,
        dateAchat: Date,
        reservationKey: string,
        shortKey: string
    ) {
        this.sport = sport;
        this.localisation = localisation;
        this.dateEvent = dateEvent;
        this.category = category;
        this.prix = prix;
        this.dateAchat = dateAchat;
        this.reservationKey = reservationKey;
        this.shortKey = shortKey;
    }
}
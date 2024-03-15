export class Adress {
    id: number;
    userId: number | null; // Ajouté pour correspondre à votre Java POJO, ajustez si nécessaire
    street: string;
    complement: string;
    zipCode: string;
    city: string;
    state: string;

    constructor(
    id: number,
    userId: number | null,
    street: string,
    complement: string,
    zipCode: string,
    city: string,
    state: string
    ) {
    this.id = id;
    this.userId = userId;
    this.street = street;
    this.complement = complement;
    this.zipCode = zipCode;
    this.city = city;
    this.state = state;
    }
}
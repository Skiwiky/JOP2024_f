import { User } from "./User";

export class Adress {
    id: number;
    street: string;
    complement: string;
    zipCode: string;
    city: string;
    state: string;

    constructor(
    id?: number,
    street?: string,
    complement?: string,
    zipCode?: string,
    city?: string,
    state?: string
    ) {
    this.id = id || 0;
    this.street = street || '';
    this.complement = complement || '';
    this.zipCode = zipCode || '';
    this.city = city || '';
    this.state = state || '';
    }
}
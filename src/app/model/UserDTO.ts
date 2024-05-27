import { BilletDTO } from "./BilletsDTO";

export class UserDTO {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    favouriteSport: string;
    billets: BilletDTO[];

    constructor(
        id: string,
        username: string,
        firstName: string,
        lastName: string,
        favouriteSport: string,
        billets: BilletDTO[]
    ) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.favouriteSport = favouriteSport;
        this.billets = billets;
    }
}
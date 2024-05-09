import { Billet } from './Billet';
import { DataBank } from './DataBank';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    favouriteSport: string;
    userKey: string;
    dateCreated: Date;
    birthdate: Date;
    role: string;
    isAccepteCGU: boolean;
    billets: Billet[];

    constructor(
        id: number = 0,
        username: string = '',
        password: string = '',
        firstName: string = '',
        lastName: string = '',
        favouriteSport: string = '',
        userKey: string = '',
        dateCreated: Date = new Date(),
        birthdate: Date = new Date(),
        role: string = '',
        isAccepteCGU: boolean = false,
        billets: Billet[] = []
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.favouriteSport = favouriteSport;
        this.userKey = userKey;
        this.dateCreated = dateCreated;
        this.birthdate = birthdate;
        this.role = role;
        this.isAccepteCGU = isAccepteCGU;
        this.billets = billets;
    }
}

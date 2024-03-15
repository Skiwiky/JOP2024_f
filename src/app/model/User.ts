import { Adress } from './Adress';
import { DataBank } from './DataBank';
import { Billet } from './Billet';
export class User {
    id: number;
  userKey: string;
  role: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  birthDate: Date;
  favouriteSport: string;
  wallet: Billet[];
  adressFacturation: Adress;
  adressSending: Adress;
  dataBank: DataBank;

  constructor(
    id: number,
    userKey: string,
    role: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    birthDate: Date,
    favouriteSport: string,
    wallet: Billet[],
    adressFacturation: Adress,
    adressSending: Adress,
    dataBank: DataBank
  ) {
    this.id = id;
    this.userKey = userKey;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.birthDate = birthDate;
    this.favouriteSport = favouriteSport;
    this.wallet = wallet;
    this.adressFacturation = adressFacturation;
    this.adressSending = adressSending;
    this.dataBank = dataBank;
  }
}
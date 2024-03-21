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
  adressFacturation: Adress | null;
  adressSending: Adress;
  dataBank: DataBank | null;

  constructor(
    id?: number,
    userKey?: string,
    role?: string,
    firstName?: string,
    lastName?: string,
    username?: string,
    password?: string,
    birthDate?: Date,
    favouriteSport?: string,
    wallet?: Billet[],
    adressFacturation?: Adress,
    adressSending?: Adress,
    dataBank?: DataBank
  ) {
    this.id = id || 0;
    this.userKey = userKey || '';
    this.role = role || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.username = username || '';
    this.password = password || '';
    this.birthDate = birthDate || new Date();
    this.favouriteSport = favouriteSport || '';
    this.wallet = wallet || [];
    this.adressFacturation = adressFacturation || new Adress();
    this.adressSending = adressSending || new Adress();
    this.dataBank = dataBank || new DataBank();
  }
}
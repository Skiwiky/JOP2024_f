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
  favoriteSport: string;
  isAccepteCGU: boolean= false;
  wallet: Billet[];
  dataBanks: DataBank | null;

  constructor(
    id?: number,
    userKey?: string,
    role?: string,
    firstName?: string,
    lastName?: string,
    username?: string,
    password?: string,
    birthDate?: Date,
    favoriteSport?: string,
    wallet?: Billet[],
    adressFacturation?: Adress,
    adressSending?: Adress,
    dataBanks?: DataBank
  ) {
    this.id = id || 0;
    this.userKey = userKey || '';
    this.role = role || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.username = username || '';
    this.password = password || '';
    this.favoriteSport = favoriteSport ||'';
    this.wallet = wallet || [];
    this.dataBanks = dataBanks || new DataBank();
  }
}
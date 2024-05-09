import { Billet } from "./Billet";
import { DataBank } from "./DataBank";
import { User } from "./User";

export class UserPaiementDTO{
    private user: User = new User();
    private dataBanks: DataBank = new DataBank();

    constructor(
        user?:User,
        dataBanks?: DataBank
    ){
    
        this.user = user  || new User();
        this.dataBanks = dataBanks || new DataBank();
    }
}
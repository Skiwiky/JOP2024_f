import { Billet } from "./Billet";
import { User } from "./User";

export class Reservation{
    private id: number;
    private user?: User;
    private tickets: Array<Billet>;
    private dateReservation:Date;
    private isAcheter: boolean;

    constructor(
        id?:number,
        user?:User,
        ticket?:Array<Billet>,
        dateReservation?: Date,
        isAcheter?:boolean
    ){
        this.id = id || 0;
        this.user = user;
        this.tickets = ticket || [];
        this.dateReservation = dateReservation || new Date();
        this.isAcheter = isAcheter || false;
    }
}
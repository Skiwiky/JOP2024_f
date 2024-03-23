import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Adress } from 'src/app/model/Adress';

@Component({
  selector: 'app-address-bloc',
  templateUrl: './address-bloc.component.html',
  styleUrls: ['./address-bloc.component.css']
})
export class AddressBlocComponent {
  @Input() adressFacturation: Adress | null = null; //on precise  le parametre besoin en entre
  @Output() addAdress = new EventEmitter<void>(); //permet de liée les interaction sortante
  @Output() deleteAdress = new EventEmitter<void>();

  addAdressFacturation() {
    this.addAdress.emit();
  }

  deleteAdressFacturation() {
    this.deleteAdress.emit();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataBank } from 'src/app/model/DataBank';

@Component({
  selector: 'app-bank-bloc',
  templateUrl: './bank-bloc.component.html',
  styleUrls: ['./bank-bloc.component.css']
})
export class BankBlocComponent {
  @Input() dataBank: DataBank | null = null; //on precise  le parametre besoin en entre
  @Output() addDataBank = new EventEmitter<void>(); //permet de liée les interaction sortante
  @Output() deleteDataBank = new EventEmitter<void>();

  addDatasBank(){
    this.addDataBank.emit();
  }

  deleteDatasBank(){
    this.deleteDataBank.emit();
  }
}

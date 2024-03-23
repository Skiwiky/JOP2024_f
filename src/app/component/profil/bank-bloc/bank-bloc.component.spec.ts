import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBlocComponent } from './bank-bloc.component';

describe('BankBlocComponent', () => {
  let component: BankBlocComponent;
  let fixture: ComponentFixture<BankBlocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankBlocComponent]
    });
    fixture = TestBed.createComponent(BankBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

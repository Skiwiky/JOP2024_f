import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBlocComponent } from './address-bloc.component';

describe('AddressBlocComponent', () => {
  let component: AddressBlocComponent;
  let fixture: ComponentFixture<AddressBlocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressBlocComponent]
    });
    fixture = TestBed.createComponent(AddressBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

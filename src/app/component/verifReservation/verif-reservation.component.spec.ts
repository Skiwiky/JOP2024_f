import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifReservationComponent } from './verif-reservation.component';

describe('VerifReservationComponent', () => {
  let component: VerifReservationComponent;
  let fixture: ComponentFixture<VerifReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

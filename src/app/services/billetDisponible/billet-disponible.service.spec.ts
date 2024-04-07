import { TestBed } from '@angular/core/testing';

import { BilletDisponibleService } from './billet-disponible.service';

describe('BilletDisponibleService', () => {
  let service: BilletDisponibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilletDisponibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

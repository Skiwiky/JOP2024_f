import { TestBed } from '@angular/core/testing';

import { BillerDispoToBilletService } from './biller-dispo-to-billet.service';

describe('BillerDispoToBilletService', () => {
  let service: BillerDispoToBilletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillerDispoToBilletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

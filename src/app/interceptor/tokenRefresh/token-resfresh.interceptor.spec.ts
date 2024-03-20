import { TestBed } from '@angular/core/testing';

import { TokenResfreshInterceptor } from './token-resfresh.interceptor';

describe('TokenResfreshInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenResfreshInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenResfreshInterceptor = TestBed.inject(TokenResfreshInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

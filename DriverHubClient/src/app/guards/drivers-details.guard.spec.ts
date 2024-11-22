import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { driversDetailsGuard } from './drivers-details.guard';

describe('driversDetailsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => driversDetailsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

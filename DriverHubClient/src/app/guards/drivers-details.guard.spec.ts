import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DriverService } from '../drivers/driver.service';
import { of } from 'rxjs';

import { DriverDetailGuard } from './drivers-details.guard';

describe('DriverDetailGuard', () => {
  let guard: DriverDetailGuard;
  let driverServiceSpy: jasmine.SpyObj<DriverService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create mock services
    driverServiceSpy = jasmine.createSpyObj('DriverService', ['isDriverIdValid']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Configure the testing module with the mock services
    TestBed.configureTestingModule({
      providers: [
        DriverDetailGuard,
        { provide: DriverService, useValue: driverServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    // Inject the guard
    guard = TestBed.inject(DriverDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when driver ID is valid', () => {
    const id = '1';
    const route = { paramMap: new Map([['id', id]]) } as any;
    driverServiceSpy.isDriverIdValid.and.returnValue(of(true));

    guard.canActivate(route).subscribe(result => {
      expect(result).toBeTrue();
    });

    expect(driverServiceSpy.isDriverIdValid).toHaveBeenCalledWith(1);
  });

  it('should return false and navigate when driver ID is invalid', () => {
    const id = '1';
    const route = { paramMap: new Map([['id', id]]) } as any;
    driverServiceSpy.isDriverIdValid.and.returnValue(of(false));

    guard.canActivate(route).subscribe(result => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/drivers']);
    });

    expect(driverServiceSpy.isDriverIdValid).toHaveBeenCalledWith(1);
  });

  it('should return false and navigate when ID is null', () => {
    const route = { paramMap: new Map([['id', null]]) } as any;

    guard.canActivate(route).subscribe(result => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/drivers']);
    });
  });

  it('should return false and navigate on error', () => {
    const id = '1';
    const route = { paramMap: new Map([['id', id]]) } as any;
    driverServiceSpy.isDriverIdValid.and.returnValue(of(false));

    guard.canActivate(route).subscribe(result => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/drivers']);
    });
  });
});

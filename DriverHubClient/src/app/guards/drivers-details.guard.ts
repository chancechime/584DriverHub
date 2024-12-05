import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DriverService } from '../drivers/driver.service';
import { MockDriverService } from '../drivers/drivers';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriverDetailGuard implements CanActivate {
  constructor(
    private router: Router,
    private mockDriverService: MockDriverService  // Ensure this is the correct service
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.paramMap.get('id');
    const driverId = id ? +id : null;

    if (driverId === null) {
      this.router.navigate(['/drivers']);
      return of(false);
    }

    // Fetch the drivers and check if the provided driverId exists
    return this.mockDriverService.getDrivers().pipe(
      map(drivers => drivers.some(driver => driver.id === driverId)),
      tap(exists => {
        if (!exists) {
          this.router.navigate(['/drivers']);  // Redirect if driver ID does not exist
        }
      }),
      catchError(() => {
        this.router.navigate(['/drivers']);  // Handle errors and redirect
        return of(false);
      })
    );
  }
}
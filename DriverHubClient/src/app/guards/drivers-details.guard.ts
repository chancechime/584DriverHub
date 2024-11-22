import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DriverService } from '../drivers/driver.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriverDetailGuard implements CanActivate {
  constructor(private driverService: DriverService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.paramMap.get('id');
    const driverId = id ? +id : null;

    if (driverId === null) {
      this.router.navigate(['/drivers']);
      return of(false);
    }

    return this.driverService.isDriverIdValid(driverId).pipe(
      tap((exists) => {
        if (!exists) {
          this.router.navigate(['/drivers']);
        }
      }),
      map(exists => exists),
      catchError(() => {
        this.router.navigate(['/drivers']);
        return of(false);
      })
    );
  }
}
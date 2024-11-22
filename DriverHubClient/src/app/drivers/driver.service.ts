import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Driver } from './drivers';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:5000/api';

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.baseUrl}/driver-details/`)
      .pipe(
        catchError(this.handleError<Driver[]>('getDrivers', []))
      );
  }

  getDriverById(id: number): Observable<Driver | undefined> {
    return this.http.get<Driver>(`driver-details/${id}`).pipe(
      catchError(this.handleError<Driver>(`getDriverById id=${id}`))
    );
  }

  // Check if driver ID is valid
  isDriverIdValid(id: number): Observable<boolean> {
    return this.getDriverById(id).pipe(map(driver => !!driver));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      return of(result as T);
    };
  }
}
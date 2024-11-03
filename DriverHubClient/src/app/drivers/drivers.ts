// FOR TESTING
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// FOR TESTING

export interface Driver {
    id: number;
    abbreivation: string;
    driverName: string;
    driverNumber: number;
    team: string;
    podiums: number;
    points: number;
    grandPrixEntered: number;
    worldChampionships: number;
    highestRaceFinish: number;
    highestGridPosition: number;
    dateOfBirth: string;
    placeOfBirth: string;
    seasonYear: number; // Uploading several csvs with different years, used to filter data
}

@Injectable({
    providedIn: 'root'
  })
  export class MockDriverService {
    private drivers: Driver[] = [
      { id: 1, abbreivation: 'HAM', driverNumber: 44, driverName: 'Lewis Hamilton', team: 'Mercedes', points: 347, worldChampionships: 7, podiums: 165, grandPrixEntered: 266, highestRaceFinish: 1, highestGridPosition: 1, dateOfBirth: '1985-01-07', placeOfBirth: 'Stevenage, England', seasonYear: 2021 },
      { id: 2, abbreivation: 'VER', driverNumber: 33, driverName: 'Max Verstappen', team: 'Red Bull Racing', points: 214, worldChampionships: 1, podiums: 60, grandPrixEntered: 130, highestRaceFinish: 1, highestGridPosition: 1, dateOfBirth: '1997-09-30', placeOfBirth: 'Hasselt, Belgium', seasonYear: 2021 },
      // Add more mock drivers as needed
    ];
  
    getDrivers(): Observable<Driver[]> {
      return of(this.drivers);
    }
  }
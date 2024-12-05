// FOR TESTING
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// FOR TESTING

export interface Driver {
    id: number;
    abbreviation: string;
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
      { id: 1, abbreviation: 'HAM', driverNumber: 44, driverName: 'Lewis Hamilton', team: 'Mercedes', points: 347, worldChampionships: 7, podiums: 165, grandPrixEntered: 266, highestRaceFinish: 1, highestGridPosition: 1, dateOfBirth: '1985-01-07', placeOfBirth: 'Stevenage, England', seasonYear: 2021 },
      { id: 2, abbreviation: 'VER', driverNumber: 33, driverName: 'Max Verstappen', team: 'Red Bull Racing', points: 214, worldChampionships: 1, podiums: 60, grandPrixEntered: 130, highestRaceFinish: 1, highestGridPosition: 1, dateOfBirth: '1997-09-30', placeOfBirth: 'Hasselt, Belgium', seasonYear: 2021 },
      { id: 3, abbreviation: 'BOT', driverNumber: 77, driverName: 'Valtteri Bottas', team: 'Mercedes', points: 160, worldChampionships: 0, podiums: 64, grandPrixEntered: 161, highestRaceFinish: 1, highestGridPosition: 1, dateOfBirth: '1989-08-28', placeOfBirth: 'Nastola, Finland', seasonYear: 2021 },
      { id: 4, abbreviation: 'NOR', driverNumber: 4, driverName: 'Lando Norris', team: 'McLaren', points: 154, worldChampionships: 0, podiums: 5, grandPrixEntered: 42, highestRaceFinish: 3, highestGridPosition: 2, dateOfBirth: '1999-11-13', placeOfBirth: 'Bristol, England', seasonYear: 2021 },
      { id: 5, abbreviation: 'PER', driverNumber: 11, driverName: 'Sergio Perez', team: 'Red Bull Racing', points: 104, worldChampionships: 0, podiums: 12, grandPrixEntered: 213, highestRaceFinish: 1, highestGridPosition: 1, dateOfBirth: '1990-01-26', placeOfBirth: 'Guadalajara, Mexico', seasonYear: 2021 },
      { id: 6, abbreviation: 'LEC', driverNumber: 16, driverName: 'Charles Leclerc', team: 'Ferrari', points: 92, worldChampionships: 0, podiums: 9, grandPrixEntered: 60, highestRaceFinish: 1, highestGridPosition: 1, dateOfBirth: '1997-10-16', placeOfBirth: 'Monte Carlo, Monaco', seasonYear: 2021 },
      { id: 7, abbreviation: 'RIC', driverNumber: 3, driverName: 'Daniel Ricciardo', team: 'McLaren', points: 115, worldChampionships: 0, podiums: 31, grandPrixEntered: 191, highestRaceFinish: 1, highestGridPosition: 1, dateOfBirth: '1989-07-01', placeOfBirth: 'Perth, Australia', seasonYear: 2021 },
      { id: 8, abbreviation: 'SAI', driverNumber: 55, driverName: 'Carlos Sainz', team: 'Ferrari', points: 83, worldChampionships: 0, podiums: 5, grandPrixEntered: 124, highestRaceFinish: 2, highestGridPosition: 2, dateOfBirth: '1994-09-01', placeOfBirth: 'Madrid, Spain', seasonYear: 2021 },
      // Add more mock drivers as needed
    ];
  
    getDrivers(): Observable<Driver[]> {
      return of(this.drivers);
    }

    getDriverDetails(id: number): Observable<Driver[]> {
      return of(this.drivers.filter((driver) => driver.id === id));
    }
  }
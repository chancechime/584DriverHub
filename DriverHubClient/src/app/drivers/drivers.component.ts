import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Driver } from './drivers';
import { MockDriverService } from './drivers';
import { routes } from '../app.routes';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent implements OnInit {
  public drivers: Driver[] = [];
  title = 'driverhubserver.client';
  private sortAscending: boolean = true;
  private lastSortedColumn: string = '';
  driverDetailsLink: string[] = [];

  constructor(private http: HttpClient, private mockDriverService: MockDriverService) {}

  ngOnInit(): void {
    this.mockDriverService.getDrivers().subscribe((data: Driver[]) => {
      this.drivers = data;
    });
  }

  getDrivers(): Observable<Driver[]> {
    return of(this.drivers);
  }

  sort(column: string) {
    if (this.lastSortedColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortAscending = true;
      this.lastSortedColumn = column;
    }

    this.drivers.sort((a, b) => {
      const key = column as keyof Driver;
      if (a[key] > b[key]) {
        return this.sortAscending ? 1 : -1;
      } else if (a[key] < b[key]) {
        return this.sortAscending ? -1 : 1;
      } else {
        return 0;
      }
    });
  }

  navToDriverDetails(id: number) {
    this.driverDetailsLink = ['/driver-details', id.toString()];
  }
}

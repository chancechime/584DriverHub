import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Driver } from './drivers';
import { MockDriverService } from './drivers';
import { routes } from '../app.routes';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [RouterLink, NgFor, RouterModule],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss',
})
export class DriversComponent implements OnInit {
  public drivers: Driver[] = [];
  public driverDetailsLink: string[] = [];
  public title = 'driverhubserver.client';
  private sortAscending: boolean = true;
  private lastSortedColumn: string = '';
  public trackByDriverId: TrackByFunction<Driver> = (index, driver) => driver.id;

  constructor(
    private http: HttpClient,
    private mockDriverService: MockDriverService,
    private router: Router
  ) {}

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
    this.router.navigate(['/driverdetails', id]);
  }
}

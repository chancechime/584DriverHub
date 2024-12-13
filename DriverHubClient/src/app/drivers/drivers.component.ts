import { Component, OnInit, TrackByFunction } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Driver } from './drivers';
import { MockDriverService } from './drivers';
import { routes } from '../app.routes';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule],
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent implements OnInit {
  public drivers: Driver[] = [];
  public driverDetailsLink: string[] = [];
  public title = 'driverhubserver.client';
  private sortAscending: boolean = true;
  private lastSortedColumn: string = '';
  public trackByDriverId: TrackByFunction<Driver> = (_index, driver) => driver.id;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getDrivers();
  }

  getDrivers() {
    this.http.get<Driver[]>(`${environment.baseUrl}/api/Driver`).subscribe({
      next: result => this.drivers = result,
      error: e => console.error(e)
    });
  }

  sort(column: string) {
    if (this.lastSortedColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortAscending = false;
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
}

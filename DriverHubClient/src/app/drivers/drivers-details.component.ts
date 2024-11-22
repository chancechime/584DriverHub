import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DriverDetails } from './driversdetails';
import { environment } from '../../environments/environment.development';
import { Driver } from './drivers';

@Component({
  selector: 'app-drivers-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './drivers-details.component.html',
  styleUrls: ['./drivers-details.component.scss'],
})
export class DriversDetailsComponent implements OnInit {
  id: number = -1;
  driver: string = '';

  public DriverDetails!: DriverDetails[];
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    let driverParam = this.activatedRoute.snapshot.paramMap.get('driver');

    this.id = idParam ? +idParam : -1;
    this.driver = driverParam ? driverParam : '';

    this.http
      .get<DriverDetails[]>(
        `${environment.baseUrl}/drivers/driverdetails/${this.id}`
      )
      .subscribe({
        next: (result: DriverDetails[]) => this.DriverDetails = result,
        error: (error: any) => console.error(error),
      });
  }
}

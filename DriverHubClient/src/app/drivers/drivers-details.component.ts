import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DriverDetails } from './driversdetails';
import { environment } from '../../environments/environment';
import { Driver } from './drivers';
import { MockDriverService } from './drivers';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-drivers-details',
  standalone: true,
  imports: [],
  templateUrl: './drivers-details.component.html',
  styleUrls: ['./drivers-details.component.scss'],
})
export class DriversDetailsComponent implements OnInit {
  id: number = -1;
  driver: string = '';
  driverNumber: number = -1;

  public DriverDetails: DriverDetails[] = []; // Initialize as an empty array

  constructor(
    private mockDriverService: MockDriverService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract route parameters
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    let driverParam = this.activatedRoute.snapshot.paramMap.get('driver');
    let driverNumberParam = this.activatedRoute.snapshot.paramMap.get('driverNumber');

    // Assign values to id and driver, handling null cases
    this.id = idParam ? +idParam : -1;
    this.driver = driverParam ? driverParam : '';
    this.driverNumber = driverNumberParam ? +driverNumberParam : -1;

    // // Fetch driver details
    // this.http
    //   .get<DriverDetails[]>(
    //     `${environment.baseUrl}/drivers/driverdetails/${this.id}`
    //   )
    //   .subscribe({
    //     next: (result: DriverDetails[]) => {
    //       this.DriverDetails = result; // Assign fetched details
    //     },
    //     error: (error: any) => {
    //       console.error(error); // Log error
    //       // You could also set an error state to display a user-friendly message
    //     },
    //   });

    // Fetch driver details from mock service
    this.mockDriverService.getDriverDetails(this.id).subscribe((data: DriverDetails[]) => {
      this.DriverDetails = data;
    });
  }

  getDriverDetails(): Observable<DriverDetails[]> {
    console.log(this.DriverDetails)
    return of(this.DriverDetails);

  }
}
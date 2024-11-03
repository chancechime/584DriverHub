import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DriverDetails } from './driversdetails';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-drivers-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './drivers-details.component.html',
  styleUrls: ['./drivers-details.component.scss']
})
export class DriversDetailsComponent implements OnInit {
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
}
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { DriversComponent } from './drivers/drivers.component';
import { RaceResultsComponent } from './race-results/race-results.component';
import { FavoritesComponent } from './favorites/favorites.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, HomeComponent, DriversComponent, RaceResultsComponent, FavoritesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DriverHubClient';
}

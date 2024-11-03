import { Routes } from '@angular/router';
import { DriversComponent } from './drivers/drivers.component';
import { RaceResultsComponent } from './race-results/race-results.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { DriversDetailsComponent } from './drivers/drivers-details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'drivers', component: DriversComponent },
    { path: 'driversdetails/:id', component: DriversDetailsComponent },
    { path: 'race-results', component: RaceResultsComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/drivers' }
];

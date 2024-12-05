import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers/drivers.component';
import { RaceResultsComponent } from './race-results/race-results.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { DriversDetailsComponent } from './drivers/drivers-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { AppComponent } from './app.component';
import { DriverDetailGuard } from './guards/drivers-details.guard';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'drivers', component: DriversComponent },
    { path: 'driver-details/:id', component: DriversDetailsComponent},
    { path: 'race-results', component: RaceResultsComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: '/drivers' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
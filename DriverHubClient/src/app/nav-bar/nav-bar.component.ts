import { Component } from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  isLoggedIn: boolean = false;

  username: string = 'User';

  constructor(private router: Router) {}

  

  // TODO: Find a way to get the username log in
  onLogOut() {
    localStorage.removeItem('LoginToken');
    console.log('Logout successful');
    window.location.reload();
  }
}

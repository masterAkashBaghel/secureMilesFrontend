import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Logout the user
  logout(): void {
    this.authService.logout();
  }
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserEmail();
  }
  userEmail: string = '';

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Logout the user
  logout(): void {
    this.authService.logout();
  }

  // Get the role of the user
  getRole(): string {
    return this.authService.getRole();
  }

  getUserEmail(): void {
    this.userEmail = this.authService.getEmail();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.userBaseUrl + 'User/signin';

  constructor(private http: HttpClient, private router: Router) {}

  // Login method
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.apiUrl, body);
  }

  // Store the token in localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken(); // If token exists, user is logged in
  }

  // Logout user by clearing the token
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/login']); // Redirect to login page
  }

  getRole(): string {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      const role =
        parsedPayload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];

      localStorage.setItem('role', role);
      return role;
    }
    return '';
  }

  saveName(): void {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      const email = parsedPayload['email'];
      localStorage.setItem('email', email);
    }
  }

  getEmail(): string {
    console.log('+++++++++', localStorage.getItem('email'));
    return localStorage.getItem('email') || '';
  }

  //save role in local storage
}

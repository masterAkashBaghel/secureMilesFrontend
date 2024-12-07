import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiBaseUrl; // Base API URL from environment file

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  registerUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}/User/register`;
    return this.http.post<any>(url, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Get the user profile
  getUserProfile(): Observable<any> {
    const url = `${this.baseUrl}/User/profile`;
    return this.http.get<any>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  // Update the user profile
  updateUserProfile(userData: any): Observable<any> {
    const url = `${this.baseUrl}/User/profile`;
    return this.http.put<any>(url, userData, {
      headers: this.getAuthHeaders(),
    });
  }
}

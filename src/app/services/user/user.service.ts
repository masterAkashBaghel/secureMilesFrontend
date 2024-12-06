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

  registerUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}/User/register`;
    return this.http.post<any>(url, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}

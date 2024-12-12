import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  private readonly claimUrl = 'http://localhost:5294/api/Claims';

  constructor(private http: HttpClient) {}

  // Function to get authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  uploadClaim(formData: FormData): Observable<any> {
    for (var pair of (formData as any).entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    return this.http.post(this.claimUrl, formData, {
      headers: this.getAuthHeaders(), // No 'Content-Type' needed for FormData
    });
  }

  getAllClaims(): Observable<any> {
    return this.http.get(this.claimUrl, {
      headers: this.getAuthHeaders().set('Content-Type', 'application/json'),
    });
  }

  getClaimDetails(claimId: number): Observable<any> {
    return this.http.get(`${this.claimUrl}/${claimId}`, {
      headers: this.getAuthHeaders().set('Content-Type', 'application/json'),
    });
  }

  deleteClaim(claimId: number): Observable<any> {
    return this.http.delete(`${this.claimUrl}/${claimId}`, {
      headers: this.getAuthHeaders().set('Content-Type', 'application/json'),
    });
  }
}

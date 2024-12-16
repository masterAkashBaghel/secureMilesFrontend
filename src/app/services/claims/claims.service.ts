import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  private readonly claimUrl = 'http://localhost:5294/api/Claims';

  private readonly adminUrl = 'http://localhost:5294/api/Admin/claims';

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

  getClaimsForAdmin(pageNumber: number, pageSize: number): Observable<any> {
    const url = `${this.adminUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url, {
      headers: this.getAuthHeaders().set('Content-Type', 'application/json'),
    });
  }

  getClaimDetailsForAdmin(claimId: number, userId: number): Observable<any> {
    const url = `${this.adminUrl}/${claimId}/details/${userId}`;
    return this.http.get<any>(url, {
      headers: this.getAuthHeaders().set('Content-Type', 'application/json'),
    });
  }

  approveClaim(claimId: number, claimAmount: number): Observable<any> {
    const url = `${this.adminUrl}/${claimId}/approve`;
    return this.http.put(
      url,
      { claimAmount },
      {
        headers: this.getAuthHeaders().set('Content-Type', 'application/json'),
      }
    );
  }

  rejectClaim(claimId: number, reason: string): Observable<any> {
    const url = `http://localhost:5294/api/claims/${claimId}/reject`;
    return this.http.put(
      url,
      { reason },
      {
        headers: this.getAuthHeaders().set('Content-Type', 'application/json'),
      }
    );
  }
}

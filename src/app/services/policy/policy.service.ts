import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private apiBaseUrl = 'http://localhost:5294/api/Policy';
  private adminApiBaseUrl = 'http://localhost:5294/api/admin/policies';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Debugging statement
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  constructor(private http: HttpClient) {}

  // Fetch all policies
  getAllPolicies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Fetch policy details
  getPolicyDetails(policyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/${policyId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Renew a policy
  renewPolicy(policyId: number, paymentDetails: any): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/${policyId}/renew`,
      paymentDetails
    );
  }

  // Download a policy document
  downloadPolicy(policyId: number): Observable<Blob> {
    return this.http.get(`${this.apiBaseUrl}/${policyId}/download`, {
      responseType: 'blob',
    });
  }

  // File a claim
  fileClaim(claimDetails: any): Observable<any> {
    return this.http.post('http://localhost:5294/api/claims', claimDetails);
  }

  // Fetch policies for admin
  getPolicyForAdmin(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(
      `${this.adminApiBaseUrl}?page=${page}&pageSize=${pageSize}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}

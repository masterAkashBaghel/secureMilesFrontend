import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  private readonly proposalsApiUrl = 'http://localhost:5294/api/Proposals';

  constructor(private http: HttpClient) {}

  // Function to get authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Submit proposal with application/json content type
  submitProposal(payload: any): Observable<any> {
    return this.http.post(this.proposalsApiUrl, payload, {
      headers: this.getAuthHeaders().set('Content-Type', 'application/json'),
    });
  }

  // Upload documents with FormData
  uploadDocuments(formData: FormData): Observable<any> {
    console.log('Uploading documents with FormData:', formData);
    for (var pair of (formData as any).entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    return this.http.post(this.proposalsApiUrl, formData, {
      headers: this.getAuthHeaders(), // No 'Content-Type' needed for FormData
    });
  }
}

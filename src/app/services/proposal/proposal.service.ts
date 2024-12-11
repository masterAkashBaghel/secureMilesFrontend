import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  private baseUrl = 'http://localhost:5294/api/Proposals';
  private paymentUrl = 'http://localhost:5294/api/payments';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Debugging statement
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  constructor(private http: HttpClient) {}

  getProposals(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  updateProposal(proposal: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${proposal.proposalId}`, proposal, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteProposal(proposalId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${proposalId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  submitPayment(proposalId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Debugging statement
    return this.http.post(
      `${this.paymentUrl}/${proposalId}`,
      {},
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}

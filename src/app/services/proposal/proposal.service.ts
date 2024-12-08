import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  private baseUrl = 'http://localhost:5294/api/Proposals';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
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
    console.log(proposalId);
    return this.http.delete(`${this.baseUrl}/${proposalId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

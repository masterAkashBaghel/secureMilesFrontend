import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:5294/api/Admin/dashboard'; // Admin dashboard API URL
  private baseUrl = 'http://localhost:5294/api/Admin';
  private userUrl = 'http://localhost:5294/api/User';

  constructor(private http: HttpClient, private router: Router) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // Get the admin dashboard data

  getAdminDashboardData(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }
  /**
   * Fetches the list of users with pagination.
   * @param pageNumber The page number to fetch.
   * @param pageSize The number of users per page.
   */
  fetchUsers(pageNumber: number, pageSize: number): Observable<any> {
    const url = `${this.baseUrl}/api/admin/users?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() }).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error fetching users:', error);
        throw error; // Pass the error to the component
      })
    );
  }

  /**
   * Deletes a user by their ID.
   * @param userId The ID of the user to delete.
   */
  deleteUser(userId: number): Observable<void> {
    const url = `${this.userUrl}/${userId}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        throw error; // Pass the error to the component
      })
    );
  }

  /**
   * Fetches the details of a specific user by their ID.
   * @param userId The ID of the user to fetch details for.
   */
  getUserDetails(userId: number): Observable<any> {
    const url = `${this.baseUrl}/api/admin/users/${userId}`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() }).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error fetching user details:', error);
        throw error; // Pass the error to the component
      })
    );
  }
  /**
   * Fetch proposals with pagination.
   * @param pageNumber Page number to fetch.
   * @param pageSize Number of items per page.
   */
  fetchProposals(pageNumber: number, pageSize: number): Observable<any> {
    const url = `${this.baseUrl}/proposals?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }

  /**
   * Fetch detailed proposal data by ID.
   * @param proposalId Proposal ID.
   */
  getProposalDetails(proposalId: number): Observable<any> {
    const url = `${this.baseUrl}/proposals/${proposalId}`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }

  /**
   * Approve a proposal.
   * @param proposalId Proposal ID to approve.
   */
  approveProposal(proposalId: number): Observable<void> {
    const url = `${this.baseUrl}/proposals/${proposalId}/approve`;
    return this.http.put<void>(url, {}, { headers: this.getAuthHeaders() });
  }

  /**
   * Reject a proposal.
   * @param proposalId Proposal ID to reject.
   */
  rejectProposal(proposalId: number): Observable<void> {
    const url = `${this.baseUrl}/proposals/${proposalId}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private baseUrl = 'http://localhost:5294/api/Vehicle';
  private readonly vehicleTypeUrl = 'http://localhost:5294/api/Vehicle/type'; // Base API URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  addVehicle(vehicleData: any): Observable<any> {
    console.log('Adding vehicle:', vehicleData);
    console.log('Headers:', this.getAuthHeaders());
    return this.http.post(this.baseUrl, vehicleData, {
      headers: this.getAuthHeaders(),
    });
  }

  fetchVehiclesByType(vehicleType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.vehicleTypeUrl}/${vehicleType}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesService } from '../../services/vehicle/vehicles.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-vehicle-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-carousel.component.html',
  styleUrls: ['./vehicle-carousel.component.css'],
})
export class VehicleCarouselComponent implements OnInit {
  @Input() vehicleType: string = ''; // Input to accept vehicle type (e.g., Car, Truck, Bike)
  vehicles: any[] = []; // Holds the fetched vehicles
  isLoading = true; // Loading state
  noVehiclesFound = false; // Flag for no vehicles

  constructor(
    private vehiclesService: VehiclesService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.vehicleType) {
      this.fetchVehicles();
    }
  }

  fetchVehicles(): void {
    this.isLoading = true;
    this.vehiclesService.fetchVehiclesByType(this.vehicleType).subscribe({
      next: (data) => {
        this.toastService.showSuccessToast(
          `Fetched ${this.vehicleType}s successfully`
        );
        console.log('Fetched vehicles:', data);
        this.vehicles = data;
        this.noVehiclesFound = data.length === 0;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.showErrorToast('Failed to fetch vehicles');
        console.error('Error fetching vehicles:', err);
        this.isLoading = false;
        this.noVehiclesFound = true;
      },
    });
  }

  getVehicleImageUrl(): string {
    console.log('Vehicle type:', this.vehicleType);
    if (this.vehicleType === 'Truck') {
      return '/public/assets/images/truckEx.png';
    } else if (this.vehicleType === 'Car') {
      return '/public/assets/images/carEx.png';
    }
    return '/public/assets/images/veh2.png';
  }
}

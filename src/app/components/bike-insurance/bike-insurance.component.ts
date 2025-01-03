import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleCarouselComponent } from '../vehicle-carousel/vehicle-carousel.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-bike-insurance',
  standalone: true,
  imports: [CommonModule, RouterModule, VehicleCarouselComponent],

  templateUrl: './bike-insurance.component.html',
  styleUrls: ['./bike-insurance.component.css'],
})
export class BikeInsuranceComponent {
  modalInstance: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  // Open the modal using Bootstrap
  openModal() {
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      this.modalInstance = new (window as any).bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  // Close the modal
  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }

    // Clear leftover modal backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }

  // Redirect to Login Page
  redirectToLogin() {
    this.closeModal(); // Close the modal first
    this.router.navigate(['/login']);
  }

  // Redirect to Car Policy Page
  redirectToCarPolicy() {
    this.closeModal(); // Close the modal first
    this.router.navigate(['/insurance']);
  }

  // Handle Get Started button click
  handleGetStarted() {
    if (this.isLoggedIn()) {
      this.redirectToCarPolicy();
    } else {
      this.openModal();
    }
  }
}

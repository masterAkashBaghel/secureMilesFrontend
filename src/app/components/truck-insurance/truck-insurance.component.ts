import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-truck-insurance',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './truck-insurance.component.html',
  styleUrls: ['./truck-insurance.component.css'],
})
export class TruckInsuranceComponent {
  modalInstance: any;

  constructor(private router: Router, private authService: AuthService) {}

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  // Open Modal
  openModal() {
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      this.modalInstance = new (window as any).bootstrap.Modal(modalElement);
      this.modalInstance.show();

      // Handle backdrop issues
      this.clearBackdrop();
    }
  }

  // Close Modal
  closeModal() {
    console.log('Closing modal');
    console.log(this.modalInstance);
    if (this.modalInstance) {
      this.modalInstance.hide();
    }

    // Handle backdrop issues
    this.clearBackdrop();
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
    console.log('Get Started clicked');
    console.log('Is logged in:', this.isLoggedIn());
    if (this.isLoggedIn()) {
      this.redirectToCarPolicy();
    } else {
      this.openModal();
    }
  }

  // Remove leftover modal backdrop
  private clearBackdrop() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
}

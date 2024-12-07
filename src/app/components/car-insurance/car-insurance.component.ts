import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-insurance',
  templateUrl: './car-insurance.component.html',
  styleUrls: ['./car-insurance.component.css'],
})
export class CarInsuranceComponent {
  modalInstance: any;

  constructor(private router: Router) {}

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

  // Remove leftover modal backdrop
  private clearBackdrop() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
}

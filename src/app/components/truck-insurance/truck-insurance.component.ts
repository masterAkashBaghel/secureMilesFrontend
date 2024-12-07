import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-truck-insurance',
  standalone: true,
  templateUrl: './truck-insurance.component.html',
  styleUrls: ['./truck-insurance.component.css'],
})
export class TruckInsuranceComponent {
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

  // Remove leftover modal backdrop
  private clearBackdrop() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
}

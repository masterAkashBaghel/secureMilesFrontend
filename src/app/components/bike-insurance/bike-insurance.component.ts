import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bike-insurance',
  standalone: true,
  templateUrl: './bike-insurance.component.html',
  styleUrls: ['./bike-insurance.component.css'],
})
export class BikeInsuranceComponent {
  modalInstance: any;

  constructor(private router: Router) {}

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
    this.closeModal();
    this.router.navigate(['/login']);
  }
}

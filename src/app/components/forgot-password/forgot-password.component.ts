import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email: string = ''; // Property for binding the email input
  message: string = ''; // Property to display success messages
  error: string = ''; // Property to display error messages

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  submitForgotPassword(): void {
    const apiUrl = ` http://localhost:5294/api/User/forgot-password`; // Backend API endpoint
    const payload = { email: this.email };

    // Clear previous messages
    this.message = '';
    this.error = '';

    // Call the backend API
    this.http.post(apiUrl, payload).subscribe({
      next: (response: any) => {
        this.message =
          response.message || 'Password reset email sent successfully!';
        this.toastService.showSuccessToast(
          this.message || 'Password reset email sent successfully!'
        );
        this.router.navigate(['/reset-password']);
      },
      error: (err) => {
        this.toastService.showErrorToast(
          err.error?.Error || 'An error occurred. Please try again.'
        );
        this.error = err.error?.Error || 'An error occurred. Please try again.';
      },
      complete: () => {
        // Optional: handle the completion of the observable, if needed
      },
    });
  }
}

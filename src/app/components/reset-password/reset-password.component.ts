import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'; // Import environment for the backend URL
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  password: string = ''; // Bind for the new password
  confirmPassword: string = ''; // Bind for the confirm password
  message: string | null = null; // Message for success
  error: string | null = null; // Error message
  token: string | null = null; // Token from the query parameter

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // Retrieve the token from the URL query parameter
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  submitResetPassword() {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      this.message = null;
      return;
    }

    // Prepare the payload with the token and the new password
    const payload = { token: this.token, newPassword: this.password };

    // Make the API call to reset the password
    const apiUrl = `${environment.apiBaseUrl}/User/reset-password`; // Make sure the API URL is correct

    // Call the reset password API
    this.http.post(apiUrl, payload).subscribe({
      next: (response: any) => {
        // Handle success
        this.message = 'Your password has been successfully reset.';
        this.error = null;
      },
      error: (err) => {
        // Handle errors
        this.error = err.error?.Error || 'Failed to reset password.';
        this.message = null;
      },
    });
  }
}

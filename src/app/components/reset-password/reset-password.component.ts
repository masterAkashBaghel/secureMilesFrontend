import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgxOtpInputComponent,
  NgxOtpInputComponentOptions,
} from 'ngx-otp-input';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgxOtpInputComponent],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  isOtpStep: boolean = true; // Track if the current step is OTP
  otp: string = ''; // Bind for the OTP
  password: string = ''; // Bind for the new password
  confirmPassword: string = ''; // Bind for the confirm password
  message: string | null = null; // Message for success
  error: string | null = null; // Error message

  otpOptions: NgxOtpInputComponentOptions = {
    otpLength: 6,
    autoFocus: true,
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  handleOtpChange(event: any): void {
    console.log('OTP Input:', event);
    this.otp = event; // Update the OTP value
  }

  submitOtp(event: any) {
    // Log the OTP
    console.log('OTP:', event);

    this.otp = event;
    console.log('OTP:', this.otp);
    // Validate OTP
    if (this.otp.length !== 6) {
      console.log(this.otp);
      this.error = 'Invalid OTP.';
      this.message = null;
      return;
    }
    // Proceed to password reset step
    this.isOtpStep = false;
    this.message = '';
    this.error = '';
  }

  submitResetPassword() {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      this.message = null;
      return;
    }

    // Prepare the payload with the token and the new password
    const payload = {
      token: this.otp,
      newPassword: this.password,
      confirmPassword: this.confirmPassword,
    };

    // API URL for resetting password
    const apiUrl = `http://localhost:5294/api/User/reset-password`;
    console.log(payload);

    // Make the API call
    this.http.post(apiUrl, payload).subscribe({
      next: (response: any) => {
        // Handle success
        this.message = 'Your password has been successfully reset.';
        this.error = null;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Handle errors
        this.error = err.error?.Error || 'Failed to reset password.';
        this.message = null;
      },
    });
  }
}

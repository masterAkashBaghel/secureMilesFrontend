import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  passwordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  role: string = '';
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Call the login service
      this.authService.login(email, password).subscribe(
        (response) => {
          // Store the token and redirect
          this.authService.saveToken(response.token);
          this.role = this.authService.getRole();
          this.authService.saveName();
          this.toastService.showSuccessToast('Login successful');
          this.authService.getRole() === 'Admin'
            ? this.router.navigate(['admin-dashboard'])
            : this.router.navigate(['']);
        },
        (error) => {
          // Handle login failure
          this.toastService.showErrorToast(
            error.error.message || 'Invalid credentials. Please try again.'
          );
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
    }
  }
}

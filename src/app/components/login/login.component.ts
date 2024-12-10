import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
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

          this.authService.getRole() === 'Admin'
            ? this.router.navigate(['admin-dashboard'])
            : this.router.navigate(['']);
        },
        (error) => {
          // Handle login failure
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
    }
  }
}

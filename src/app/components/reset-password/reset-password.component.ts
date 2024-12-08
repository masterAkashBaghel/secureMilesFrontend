import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  password: string = '';
  confirmPassword: string = '';
  message: string | null = null;
  error: string | null = null;
  token: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  submitResetPassword() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      this.message = null;
      return;
    }

    const payload = { token: this.token, newPassword: this.password };
    this.http.post('/api/reset-password', payload).subscribe({
      next: (response: any) => {
        this.message = 'Your password has been successfully reset.';
        this.error = null;
      },
      error: (err) => {
        this.error = err.error?.Error || 'Failed to reset password.';
        this.message = null;
      },
    });
  }
}

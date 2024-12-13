import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userData: any;
  successMessage: string = '';
  errorMessage: string = '';
  isEditMode = false; // Toggle between view and edit mode

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Initialize the form group
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      aadhaarNumber: ['', Validators.required],
      pan: ['', Validators.required],
    });

    // Fetch user profile
    this.getUserProfile();
    this.getRole();
  }

  // Get user profile from the backend
  getUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (response) => {
        this.userData = response;
        this.profileForm.patchValue({
          name: this.userData.name,
          email: this.userData.email,
          address: this.userData.address,
          city: this.userData.city,
          state: this.userData.state,
          zipCode: this.userData.zipCode,
          phone: this.userData.phone,
          dob: this.userData.dob,
          aadhaarNumber: this.userData.aadhaarNumber,
          pan: this.userData.pan,
        });
      },
      (error) => {
        this.errorMessage = 'Failed to load user profile';
      }
    );
  }

  // Update user profile
  onSubmit(): void {
    if (this.profileForm.valid) {
      this.userService.updateUserProfile(this.profileForm.value).subscribe(
        (response) => {
          this;
          this.successMessage = 'Profile updated successfully!';
          // Optionally, redirect after successful update
          // this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.toastService.showErrorToast('Failed to update profile');
          this.errorMessage = 'Failed to update profile. Please try again.';
        }
      );
    }
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  // get the role
  getRole(): string {
    console.log(this.authService.getRole());
    return this.authService.getRole();
  }
}

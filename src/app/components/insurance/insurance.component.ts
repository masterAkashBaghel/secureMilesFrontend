import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiclesService } from '../../services/vehicle/vehicles.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PolicySelectionComponent } from '../policy-selection/policy-selection.component';
import { Tooltip } from 'bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PolicySelectionComponent,
  ],
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css'],
})
export class InsuranceComponent implements OnInit {
  vehicleForm!: FormGroup;
  policies: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  isPolicySelectionVisible = false;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehiclesService,
    private snackBar: MatSnackBar,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      type: ['', Validators.required],
      model: ['', Validators.required],
      make: ['', Validators.required],
      year: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      registrationNumber: [
        '',
        [Validators.required, Validators.pattern('^[A-Z0-9]{1,10}$')],
      ],
      chassisNumber: ['', Validators.required],
      engineNumber: ['', Validators.required],
      color: ['', Validators.required],
      fuelType: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      marketValue: ['', [Validators.required, Validators.min(0)]],
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
  }

  submitVehicleDetails(): void {
    if (this.vehicleForm.valid) {
      console.log(this.vehicleForm.value);
      this.vehicleService.addVehicle(this.vehicleForm.value).subscribe(
        (response) => {
          this.successMessage = response.message;
          this.policies = response.policies;
          this.isPolicySelectionVisible = true;
          this.toastService.showSuccessToast(
            this.successMessage + ' Please select a policy.'
          );
        },
        (error) => {
          this.errorMessage =
            'Failed to save vehicle details. Please try again.';
          this.toastService.showErrorToast(this.errorMessage);
        }
      );
    }
  }

  resetForm(): void {
    this.vehicleForm.reset();
    this.isPolicySelectionVisible = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiclesService } from '../../services/vehicle/vehicles.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PolicySelectionComponent } from '../policy-selection/policy-selection.component';
import { Tooltip } from 'bootstrap';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';
import { PolicyDataService } from '../../services/policyData/policy-data-service.service';

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
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehiclesService,
    private toastService: ToastService,
    private router: Router,
    private policyDataService: PolicyDataService
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
      //no future dates allowed
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
          // route to policy selection by passing the policies
          this.policyDataService.setPolicies(this.policies);
          this.router.navigate(['/policy-selection']);
        },
        (error) => {
          this.errorMessage =
            'Failed to save vehicle details. Please try again.';
          // this.toastService.showErrorToast(this.errorMessage);
        }
      );
    }
  }

  resetForm(): void {
    this.vehicleForm.reset();
    this.isPolicySelectionVisible = false;
  }
}

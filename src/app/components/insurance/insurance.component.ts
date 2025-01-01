import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiclesService } from '../../services/vehicle/vehicles.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Tooltip } from 'bootstrap';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';
import { PolicyDataService } from '../../services/policyData/policy-data-service.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate(
          '0.3s ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s ease-in',
          style({ opacity: 0, transform: 'translateX(-20px)' })
        ),
      ]),
    ]),
  ],
})
export class InsuranceComponent implements OnInit {
  vehicleForm!: FormGroup;
  policies: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  isPolicySelectionVisible = false;
  today: string = new Date().toISOString().split('T')[0];
  currentStep = 1;
  totalSteps = 4;
  formProgress = 0;
  currentYear: number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehiclesService,
    private toastService: ToastService,
    private router: Router,
    private policyDataService: PolicyDataService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initTooltips();
    this.setupFormValueChanges();
  }

  private initForm(): void {
    this.vehicleForm = this.fb.group({
      // Step 1
      type: ['', Validators.required],
      make: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z][A-Za-z\\s-]*$'),
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      // Step 2
      model: ['', Validators.required],
      year: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],

      // Step 3
      registrationNumber: [
        '',
        [Validators.required, Validators.pattern('^[A-Z0-9]{1,10}$')],
      ],
      chassisNumber: ['', Validators.required],

      // Step 4
      engineNumber: ['', Validators.required],
      color: ['', Validators.required],
      fuelType: ['', Validators.required],
      marketValue: ['', [Validators.required, Validators.min(0)]],
    });
  }

  private initTooltips(): void {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
  }

  private setupFormValueChanges(): void {
    this.vehicleForm.valueChanges.subscribe(() => {
      this.updateFormProgress();
    });
  }

  private updateFormProgress(): void {
    const totalControls = Object.keys(this.vehicleForm.controls).length;
    const validControls = Object.values(this.vehicleForm.controls).filter(
      (control) => control.valid
    ).length;
    this.formProgress = (validControls / totalControls) * 100;
  }

  nextStep(): void {
    if (this.isCurrentStepValid() && this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    const controls = this.vehicleForm.controls;
    switch (this.currentStep) {
      case 1:
        return controls['type'].valid && controls['make'].valid;
      case 2:
        return controls['model'].valid && controls['year'].valid;
      case 3:
        return (
          controls['registrationNumber'].valid &&
          controls['chassisNumber'].valid
        );
      case 4:
        return (
          controls['engineNumber'].valid &&
          controls['color'].valid &&
          controls['fuelType'].valid &&
          controls['marketValue'].valid
        );
      default:
        return false;
    }
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

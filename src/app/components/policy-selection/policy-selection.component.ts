import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceService } from '../../services/insurance/insurance.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { PolicyDataService } from '../../services/policyData/policy-data-service.service';

@Component({
  selector: 'app-policy-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './policy-selection.component.html',
  styleUrls: ['./policy-selection.component.css'],
})
export class PolicySelectionComponent implements OnInit {
  policies: any[] = [];
  selectedPolicy: any = null;
  files: { [key: string]: File } = {};
  selectedProposalId: any = null;

  constructor(
    private insuranceService: InsuranceService,
    private router: Router,
    private toastService: ToastService,
    private policyDataService: PolicyDataService // Inject PolicyDataService
  ) {}

  ngOnInit(): void {
    // Retrieve policies from the shared service
    this.policies = this.policyDataService.getPolicies();
  }

  onFileSelect(event: Event, fileType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.files[fileType] = file;
      console.log('File selected:', file);
    }
  }

  submitDocuments(): void {
    if (this.files['VehicleInsurance']) {
      const formData = new FormData();
      formData.append('ProposalDocument', this.files['VehicleInsurance']);
      formData.append('VehicleId', this.selectedPolicy.vehicleID.toString()); // Ensure it's a string
      formData.append(
        'RequestedCoverage',
        this.selectedPolicy.coverageAmount.toString()
      ); // Ensure it's a string
      formData.append('PolicyType', this.selectedPolicy.policyType);
      formData.append(
        'PremiumAmount',
        this.selectedPolicy.premiumAmount.toString()
      ); // Ensure it's a string

      // Log the FormData content for debugging
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      this.insuranceService.uploadDocuments(formData).subscribe({
        next: (response) => {
          navigator.vibrate(200);
          this.toastService.showSuccessToast('Proposal submitted successfully');
          this.router.navigate(['proposals']);
        },
        error: (error) => {
          this.toastService.showErrorToast('Failed to upload documents');
          console.error('Error uploading documents:', error);
        },
      });
    } else {
      this.toastService.showErrorToast('No VehicleInsurance file selected.');
      console.error('No VehicleInsurance file selected.');
    }
  }

  getCardClass(index: number) {
    const classes = ['bg-warning', 'bg-info', 'bg-light'];
    return classes[index % classes.length];
  }
}

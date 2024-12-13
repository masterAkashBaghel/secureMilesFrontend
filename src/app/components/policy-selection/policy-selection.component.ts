import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceService } from '../../services/insurance/insurance.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-policy-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './policy-selection.component.html',
  styleUrls: ['./policy-selection.component.css'],
})
export class PolicySelectionComponent {
  @Input() policies: any[] = [];
  selectedPolicy: any = null;
  documentsRequired = false;
  files: { [key: string]: File } = {};
  selectedProposalId: any = null;

  constructor(
    private insuranceService: InsuranceService,
    private router: Router,
    private toastService: ToastService
  ) {}

  submitProposal(): void {
    if (this.selectedPolicy) {
      // Collect all the required data
      const payload = {
        vehicleId: this.selectedPolicy.vehicleID,
        requestedCoverage: this.selectedPolicy.coverageAmount,
        policyType: this.selectedPolicy.policyType,
        premiumAmount: this.selectedPolicy.premiumAmount,
      };

      // Call the service with the payload
      this.insuranceService.submitProposal(payload).subscribe({
        next: (response: any) => {
          console.log('Proposal Response:', response);
          this.toastService.showSuccessToast('Proposal submitted successfully');
          this.selectedProposalId = response.proposalId;
          this.documentsRequired = true; // Toggle to document submission view
        },
        error: (error) => {
          this.toastService.showErrorToast('Failed to submit proposal');
          console.error('Error submitting proposal:', error);
        },
      });
    }
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
      formData.append('Type', 'VehicleInsurance');
      formData.append('DocumentFile', this.files['VehicleInsurance']);
      formData.append('ProposalID', this.selectedProposalId);
      // Log the FormData content
      // Log the FormData content
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      // Ensure the API expects FormData correctly
      this.insuranceService.uploadDocuments(formData).subscribe({
        next: (response) => {
          navigator.vibrate(200);
          this.toastService.showSuccessToast('Documents uploaded successfully');
          this.router.navigate(['proposals']);

          console.log('Documents uploaded successfully:', response);
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
}

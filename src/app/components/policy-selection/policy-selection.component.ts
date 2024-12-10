import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceService } from '../../services/insurance/insurance.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

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
    private router: Router
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

      console.log('Proposal Payload:', payload);

      // Call the service with the payload
      this.insuranceService.submitProposal(payload).subscribe({
        next: (response: any) => {
          console.log('Proposal Response:', response);
          this.selectedProposalId = response.proposalId;
          this.documentsRequired = true; // Toggle to document submission view
        },
        error: (error) => {
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
          this.router.navigate(['proposals']);

          console.log('Documents uploaded successfully:', response);
        },
        error: (error) => {
          console.error('Error uploading documents:', error);
        },
      });
    } else {
      console.error('No VehicleInsurance file selected.');
    }
  }
}

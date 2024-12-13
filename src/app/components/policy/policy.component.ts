import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../services/policy/policy.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentsService } from '../../services/documents/documents.service';
import { FormsModule } from '@angular/forms';
import { ClaimsService } from '../../services/claims/claims.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent implements OnInit {
  policies: any[] = [];
  selectedPolicy: any = null;
  claim: any = {
    incidentDate: '',
    description: '',
    file: null,
    claimAmount: 0,
  };
  showModal: string | null = null; // Track which modal to show

  constructor(
    private policyService: PolicyService,
    private documentsService: DocumentsService,
    private claimService: ClaimsService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policyService.getAllPolicies().subscribe({
      next: (data) => (this.policies = data),
      error: (err) => {
        console.error('Error fetching policies:', err);
        this.toastService.showErrorToast('Failed to fetch policies');
      },
    });
  }

  viewPolicyDetails(policyId: number): void {
    this.policyService.getPolicyDetails(policyId).subscribe({
      next: (data) => {
        this.toastService.showSuccessToast(
          'Policy details fetched successfully'
        );
        this.selectedPolicy = data;
        this.showModal = 'policyDetails';
      },
      error: (err) => {
        console.error('Error fetching policy details:', err);
        this.toastService.showErrorToast('Failed to fetch policy details');
      },
    });
  }

  downloadPolicy(policyId: number): void {
    this.policyService.getPolicyDetails(policyId).subscribe({
      next: (data) => {
        this.documentsService.generatePolicyPDF(data);
        this.toastService.showSuccessToast('Policy downloaded successfully');
      },
      error: (err) => {
        this.toastService.showErrorToast('Failed to download policy');
        console.error('Error downloading policy:', err);
      },
    });
  }

  renewPolicy(policyId: number): void {
    const paymentDetails = { amount: 12000 };
    this.policyService.renewPolicy(policyId, paymentDetails).subscribe({
      next: () => {
        this.toastService.showSuccessToast('Policy renewed successfully');
        this.loadPolicies();
      },
      error: (err) => {
        this.toastService.showErrorToast('Failed to renew policy');
        console.error('Error renewing policy:', err);
      },
    });
  }

  fileClaim(policyId: number): void {
    this.selectedPolicy = this.policies.find(
      (policy) => policy.policyId === policyId
    );
    this.showModal = 'claim';
  }

  onFileSelected(event: any): void {
    this.claim.file = event.target.files[0];
  }

  submitClaim(): void {
    if (this.claim.incidentDate && this.claim.description && this.claim.file) {
      const formData = new FormData();
      formData.append('IncidentDate', this.claim.incidentDate);
      formData.append('Description', this.claim.description);
      formData.append('DocumentFile', this.claim.file);
      formData.append('PolicyId', this.selectedPolicy.policyId);
      formData.append('ClaimAmount', this.claim.claimAmount.toString());

      this.claimService.uploadClaim(formData).subscribe({
        next: (response) => {
          console.log('Claim submitted:', response);
          this.showModal = null;
          this.toastService.showSuccessToast('Claim submitted successfully');
          this.router.navigate(['/claim']);
        },
        error: (err) => {
          console.error('Error submitting claim:', err);
          this.toastService.showErrorToast('Failed to submit claim');
        },
      });
    } else {
      this.toastService.showErrorToast('Please fill all fields');
    }
  }

  closeModal(): void {
    this.selectedPolicy = null;
    this.showModal = null;
  }

  isRenewalNear(policyEndDate: Date): boolean {
    const today = new Date();
    const endDate = new Date(policyEndDate);
    const oneMonthBeforeEndDate = new Date(
      endDate.setMonth(endDate.getMonth() - 1)
    );
    return today >= oneMonthBeforeEndDate;
  }
}

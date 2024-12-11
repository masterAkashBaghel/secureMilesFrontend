import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../services/policy/policy.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent implements OnInit {
  policies: any[] = [];
  selectedPolicy: any = null;

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policyService.getAllPolicies().subscribe({
      next: (data) => (this.policies = data),
      error: (err) => console.error('Error fetching policies:', err),
    });
  }

  viewPolicyDetails(policyId: number): void {
    this.policyService.getPolicyDetails(policyId).subscribe({
      next: (data) => (this.selectedPolicy = data),
      error: (err) => console.error('Error fetching policy details:', err),
    });
  }

  downloadPolicy(policyId: number): void {
    this.policyService.downloadPolicy(policyId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `Policy_${policyId}.pdf`;
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('Error downloading policy:', err),
    });
  }

  renewPolicy(policyId: number): void {
    const paymentDetails = { amount: 12000 };
    this.policyService.renewPolicy(policyId, paymentDetails).subscribe({
      next: () => alert('Policy renewed successfully!'),
      error: (err) => console.error('Error renewing policy:', err),
    });
  }

  fileClaim(policyId: number): void {
    // Implement file claim logic here
    alert('File claim functionality to be implemented.');
  }

  closeModal(): void {
    this.selectedPolicy = null;
  }
}

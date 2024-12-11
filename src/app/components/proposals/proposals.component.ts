import { Component, OnInit } from '@angular/core';
import { ProposalService } from '../../services/proposal/proposal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-proposals',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css'],
})
export class ProposalComponent implements OnInit {
  proposals: any[] = [];
  selectedProposal: any;
  editProposalForm: FormGroup;
  paymentForm: FormGroup;

  constructor(
    private proposalService: ProposalService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editProposalForm = this.fb.group({
      proposalId: [''],
      vehicleMake: [''],
      vehicleModel: [''],
      requestedCoverage: [''],
    });

    this.paymentForm = this.fb.group({
      transactionId: [''],
      amount: [''],
      userId: [''],
      policyId: [''],
      cardNumber: [''],
      cardExpiry: [''],
      cardCVC: [''],
    });
  }

  ngOnInit(): void {
    this.loadProposals();
  }

  loadProposals() {
    this.proposalService
      .getProposals()
      .pipe(
        catchError((error) => {
          console.error('Error loading proposals', error);
          alert('Failed to load proposals. Please try again later.');
          return of([]);
        })
      )
      .subscribe((data) => {
        this.proposals = data;
      });
  }

  openEditModal(proposal: any) {
    this.editProposalForm.patchValue(proposal);
    const modalElement = document.getElementById('editProposalModal');
    if (modalElement) {
      const editProposalModal = new (window as any).bootstrap.Modal(
        modalElement
      );
      editProposalModal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  submitEditProposal() {
    const updatedProposal = this.editProposalForm.value;
    this.proposalService
      .updateProposal(updatedProposal)
      .pipe(
        catchError((error) => {
          console.error('Error updating proposal', error);
          alert('Failed to update proposal. Please try again later.');
          return of(null);
        })
      )
      .subscribe(() => {
        alert('Proposal updated successfully!');
        this.loadProposals();
      });
  }

  deleteProposal(proposalId: number) {
    this.proposalService
      .deleteProposal(proposalId)
      .pipe(
        catchError((error) => {
          console.error('Error deleting proposal', error);
          alert('Failed to delete proposal. Please try again later.');
          return of(null);
        })
      )
      .subscribe(() => {
        alert('Proposal deleted successfully!');
        this.loadProposals();
      });
  }

  updateDocument(proposalId: number) {
    alert('Document update functionality to be implemented.');
  }

  openPaymentModal(proposal: any) {
    this.selectedProposal = proposal;
    this.paymentForm.patchValue({
      transactionId: '',
      amount: proposal.requestedCoverage,
      userId: proposal.userId,
      policyId: proposal.policyId,
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
    });
    const modalElement = document.getElementById('paymentModal');
    if (modalElement) {
      const paymentModal = new (window as any).bootstrap.Modal(modalElement);
      paymentModal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  submitPayment() {
    console.log('proposal id ' + this.selectedProposal.proposalId);
    this.proposalService
      .submitPayment(this.selectedProposal.proposalId)
      .pipe(
        catchError((error) => {
          console.error('Error submitting payment', error);
          alert('Failed to submit payment. Please try again later.');
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          alert('Payment submitted successfully!');
          this.router.navigate(['/policy']);
        }
        const modalElement = document.getElementById('paymentModal');
        if (modalElement) {
          const paymentModal = new (window as any).bootstrap.Modal(
            modalElement
          );
          paymentModal.hide();
        }
      });
  }

  getImageUrl(status: string): string {
    switch (status) {
      case 'Pending':
        return '/public/assets/images/pending.png';
      case 'Approved':
        return '/public/assets/images/paymentReq.png';
      case 'Rejected':
        return '/public/assets/images/done.png';
      case 'Converted to Policy':
        return '/public/assets/images/approved.png';
      default:
        return '/public/assets/images/done.png';
    }
  }

  getCardClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'card-pending';
      case 'Approved':
        return 'card-approved';
      case 'Rejected':
        return 'card-rejected';
      case 'Converted to Policy':
        return 'card-converted';
      default:
        return 'card-default';
    }
  }
}

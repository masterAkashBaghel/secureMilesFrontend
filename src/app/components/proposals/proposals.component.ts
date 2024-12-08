import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProposalService } from '../../services/proposal/proposal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
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
  editProposalForm: FormGroup;

  constructor(
    private proposalService: ProposalService,
    private fb: FormBuilder
  ) {
    this.editProposalForm = this.fb.group({
      proposalId: [''],
      vehicleMake: [''],
      vehicleModel: [''],
      requestedCoverage: [''],
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

  // define a function to get a random image URL from an array of URLs
  getRandomImageUrl() {
    const imageUrls = [
      '/public/assets/images/insurance.png',
      '/public/assets/images/insurance2.png',
      '/public/assets/images/insurance3.png',
      '/public/assets/images/insurance4.png',
    ];
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  }
}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-proposals',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-proposals.component.html',
  styleUrls: ['./admin-proposals.component.css'],
})
export class AdminProposalsComponent implements OnInit {
  proposals: any[] = [];
  approvedProposals: any[] = [];
  pendingProposals: any[] = [];
  canceledProposals: any[] = [];
  selectedProposal: any = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchProposals(1, 20);
  }

  /**
   * Fetch proposals from the API.
   * @param pageNumber Page number.
   * @param pageSize Page size.
   */
  fetchProposals(pageNumber: number, pageSize: number): void {
    this.adminService
      .fetchProposals(pageNumber, pageSize)
      .subscribe((response) => {
        this.proposals = response.proposals;
        this.filterProposals();
      });
  }

  /**
   * Filter proposals based on their status.
   */
  filterProposals(): void {
    this.approvedProposals = this.proposals.filter(
      (proposal) => proposal.status === 'Approved'
    );
    this.pendingProposals = this.proposals.filter(
      (proposal) => proposal.status === 'Pending'
    );
    this.canceledProposals = this.proposals.filter(
      (proposal) => proposal.status === 'Canceled'
    );
  }

  /**
   * Fetch proposal details and display in the modal.
   * @param proposalId Proposal ID.
   */
  viewDetails(proposalId: number): void {
    this.adminService.getProposalDetails(proposalId).subscribe((response) => {
      this.selectedProposal = response;
      const modal = new (window as any).bootstrap.Modal(
        document.getElementById('proposalDetailsModal')
      );
      modal.show();
    });
  }

  /**
   * Approve the selected proposal.
   */
  approveProposal(): void {
    if (this.selectedProposal) {
      this.adminService
        .approveProposal(this.selectedProposal.proposalId)
        .subscribe(() => {
          alert('Proposal approved successfully!');
          this.fetchProposals(1, 10);
          this.closeModal();
        });
    }
  }

  /**
   * Reject the selected proposal.
   */
  rejectProposal(): void {
    if (this.selectedProposal) {
      this.adminService
        .rejectProposal(this.selectedProposal.proposalId)
        .subscribe(() => {
          alert('Proposal rejected successfully!');
          this.fetchProposals(1, 20);
          this.closeModal();
        });
    }
  }

  /**
   * Close the modal.
   */
  private closeModal(): void {
    const modal = document.getElementById('proposalDetailsModal');
    if (modal) {
      (modal as any).classList.remove('show');
      (modal as any).setAttribute('aria-hidden', 'true');
      (modal as any).style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }
  }
}

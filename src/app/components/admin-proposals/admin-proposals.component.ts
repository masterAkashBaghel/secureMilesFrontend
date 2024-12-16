import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-proposals',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbPagination],
  templateUrl: './admin-proposals.component.html',
  styleUrls: ['./admin-proposals.component.css'],
})
export class AdminProposalsComponent implements OnInit {
  proposals: any[] = [];
  approvedProposals: any[] = [];
  pendingProposals: any[] = [];
  canceledProposals: any[] = [];
  selectedProposal: any = null;
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchProposals(this.currentPage, this.pageSize);
  }

  fetchProposals(pageNumber: number, pageSize: number): void {
    this.adminService
      .fetchProposals(pageNumber, pageSize)
      .pipe(
        catchError((error) => {
          alert('Failed to load proposals');
          return of({ proposals: [], totalCount: 0, currentPage: 1 });
        })
      )
      .subscribe((response) => {
        this.proposals = response.proposals;
        this.totalCount = response.totalCount;
        this.currentPage = response.currentPage;
        this.filterProposals();
      });
  }

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

  viewDetails(proposalId: number): void {
    this.adminService.getProposalDetails(proposalId).subscribe((response) => {
      this.selectedProposal = response;
      const modal = new (window as any).bootstrap.Modal(
        document.getElementById('proposalDetailsModal')
      );
      modal.show();
    });
  }

  approveProposal(): void {
    if (this.selectedProposal) {
      this.adminService
        .approveProposal(this.selectedProposal.proposalId)
        .subscribe(() => {
          alert('Proposal approved successfully!');
          this.fetchProposals(this.currentPage, this.pageSize);
          this.closeModal();
        });
    }
  }

  rejectProposal(): void {
    if (this.selectedProposal) {
      this.adminService
        .rejectProposal(this.selectedProposal.proposalId)
        .subscribe(() => {
          alert('Proposal rejected successfully!');
          this.fetchProposals(this.currentPage, this.pageSize);
          this.closeModal();
        });
    }
  }

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

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.fetchProposals(this.currentPage, this.pageSize);
  }
}

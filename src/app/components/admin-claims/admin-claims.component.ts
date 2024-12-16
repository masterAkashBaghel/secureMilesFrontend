import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClaimsService } from '../../services/claims/claims.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-claims',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, NgbPagination],
  templateUrl: './admin-claims.component.html',
  styleUrls: ['./admin-claims.component.css'],
})
export class AdminClaimsComponent implements OnInit {
  claims: any[] = [];
  claimDetails: any = null;
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  claimAmount: number | null = null;
  rejectionReason: string | null = null;

  constructor(
    private claimService: ClaimsService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadClaims(1);
  }

  loadClaims(pageNumber: number): void {
    this.claimService
      .getClaimsForAdmin(pageNumber, this.pageSize)
      .pipe(
        catchError((error) => {
          this.toastService.showErrorToast('Failed to load claims');
          return of({ claims: [], totalCount: 0, currentPage: 1 });
        })
      )
      .subscribe((response) => {
        this.claims = response.claims;
        this.totalCount = response.totalCount;
        this.currentPage = response.currentPage;
      });
  }

  openDetailsModal(
    claimId: number,
    userId: number,
    modal: TemplateRef<any>
  ): void {
    this.claimService
      .getClaimDetailsForAdmin(claimId, userId)
      .pipe(
        catchError((error) => {
          this.toastService.showErrorToast('Failed to load claim details');
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.claimDetails = response;
          this.modalService.open(modal, { size: 'lg' });
        }
      });
  }

  approveClaim(): void {
    if (!this.claimDetails || this.claimAmount === null) return;

    this.claimService
      .approveClaim(this.claimDetails.claimId, this.claimAmount)
      .pipe(
        catchError((error) => {
          this.toastService.showErrorToast('Failed to approve claim');
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.toastService.showSuccessToast('Claim approved successfully!');
          this.modalService.dismissAll();
          this.loadClaims(this.currentPage);
        }
      });
  }

  rejectClaim(): void {
    if (!this.claimDetails || !this.rejectionReason) return;

    this.claimService
      .rejectClaim(this.claimDetails.claimId, this.rejectionReason)
      .pipe(
        catchError((error) => {
          this.toastService.showErrorToast('Failed to reject claim');
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.toastService.showSuccessToast('Claim rejected successfully!');
          this.modalService.dismissAll();
          this.loadClaims(this.currentPage);
        }
      });
  }
}

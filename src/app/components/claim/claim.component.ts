import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../../services/claims/claims.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast/toast.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-claim',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css'],
})
export class ClaimComponent implements OnInit {
  claims: any[] = [];
  selectedClaim: any = null;
  showModal: string | null = null; // Track which modal to show

  constructor(
    private claimService: ClaimsService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchClaims();
  }

  fetchClaims(): void {
    this.claimService
      .getAllClaims()
      .pipe(
        catchError((error) => {
          this.toastService.showErrorToast('Failed to fetch claims');
          return of([]);
        })
      )
      .subscribe((data) => {
        this.toastService.showSuccessToast('Claims fetched successfully');
        this.claims = data;
      });
  }

  viewClaimDetails(claimId: number): void {
    this.claimService
      .getClaimDetails(claimId)
      .pipe(
        catchError((error) => {
          this.toastService.showErrorToast('Failed to fetch claim details');
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.selectedClaim = data;
          this.showModal = 'claimDetails';
        }
      });
  }

  deleteClaim(claimId: number): void {
    if (confirm('Are you sure you want to delete this claim?')) {
      this.claimService
        .deleteClaim(claimId)
        .pipe(
          catchError((error) => {
            this.toastService.showErrorToast('Failed to delete claim');
            return of(null);
          })
        )
        .subscribe((data) => {
          if (data) {
            this.toastService.showSuccessToast('Claim deleted successfully');

            this.claims = this.claims.filter(
              (claim) => claim.claimId !== claimId
            );
          }
        });
    }
  }

  closeModal(): void {
    this.selectedClaim = null;
    this.showModal = null;
  }
}

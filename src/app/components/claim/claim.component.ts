import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../../services/claims/claims.service';
import { CommonModule } from '@angular/common';

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

  constructor(private claimService: ClaimsService) {}

  ngOnInit(): void {
    this.fetchClaims();
  }

  fetchClaims(): void {
    this.claimService.getAllClaims().subscribe((data) => {
      this.claims = data;
    });
  }

  viewClaimDetails(claimId: number): void {
    this.claimService.getClaimDetails(claimId).subscribe((data) => {
      this.selectedClaim = data;
      this.showModal = 'claimDetails';
    });
  }

  deleteClaim(claimId: number): void {
    if (confirm('Are you sure you want to delete this claim?')) {
      this.claimService.deleteClaim(claimId).subscribe(() => {
        this.claims = this.claims.filter((claim) => claim.claimId !== claimId);
      });
    }
  }

  closeModal(): void {
    this.selectedClaim = null;
    this.showModal = null;
  }
}

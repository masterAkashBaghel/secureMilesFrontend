import { Component, OnInit, TemplateRef } from '@angular/core';
import { PolicyService } from '../../services/policy/policy.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-policies',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, NgbPagination],
  templateUrl: './admin-policies.component.html',
  styleUrls: ['./admin-policies.component.css'],
})
export class AdminPoliciesComponent implements OnInit {
  policies: any[] = [];
  selectedPolicy: any = null;
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private policyService: PolicyService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadPolicies(this.currentPage);
  }

  loadPolicies(pageNumber: number): void {
    this.policyService
      .getPolicyForAdmin(pageNumber, this.pageSize)
      .pipe(
        catchError((error) => {
          this.toastService.showErrorToast('Failed to load policies');
          return of({ policies: [], totalCount: 0 });
        })
      )
      .subscribe((response) => {
        console.log('Policies:', response.policies); // Debugging statement
        this.policies = response.policies;
        this.totalCount = response.totalCount;
        this.currentPage = pageNumber;
      });
  }

  openPolicyDetailsModal(modal: TemplateRef<any>, policy: any): void {
    this.selectedPolicy = policy;
    this.modalService.open(modal, { size: 'lg' });
  }

  isRenewalNear(policyEndDate: string): boolean {
    const today = new Date();
    const endDate = new Date(policyEndDate);
    const timeDiff = endDate.getTime() - today.getTime();
    const daysToEnd = timeDiff / (1000 * 3600 * 24);
    return daysToEnd <= 30; // Renewal is near if within 30 days
  }

  expirePolicy(policyId: number): void {
    this.toastService.showSuccessToast('Expiring policy...');
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPolicies(page);
  }
}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbPagination],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  activeUsers: any[] = [];
  inactiveUsers: any[] = [];
  selectedUser: any = null;
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private adminService: AdminService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchUsers(this.currentPage, this.pageSize);
  }

  fetchUsers(pageNumber: number, pageSize: number): void {
    this.adminService
      .fetchUsers(pageNumber, pageSize)
      .pipe(
        catchError((error) => {
          this.toastService.showErrorToast('Failed to fetch users');
          return of({ users: [] });
        })
      )
      .subscribe((response) => {
        this.users = response.users;
        this.totalCount = response.totalCount;
        this.currentPage = pageNumber;
        this.filterUsersByStatus();
      });
  }

  filterUsersByStatus(): void {
    this.activeUsers = this.users.filter((user) => user.isActive);
    this.inactiveUsers = this.users.filter((user) => !user.isActive);
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService
        .deleteUser(userId)
        .pipe(
          catchError((error) => {
            this.toastService.showErrorToast('Failed to delete user');
            return of(null);
          })
        )
        .subscribe(() => {
          this.users = this.users.filter((user) => user.userId !== userId);
          this.filterUsersByStatus();
          this.toastService.showSuccessToast('User deleted successfully');
        });
    }
  }

  viewDetails(userId: number): void {
    this.adminService
      .getUserDetails(userId)
      .pipe(
        catchError((error) => {
          this.toastService.showErrorToast('Failed to fetch user details');
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.selectedUser = response;
          const modal = new (window as any).bootstrap.Modal(
            document.getElementById('userDetailsModal')
          );
          modal.show();
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchUsers(page, this.pageSize);
  }
}

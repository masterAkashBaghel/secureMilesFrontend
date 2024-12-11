import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  activeUsers: any[] = [];
  inactiveUsers: any[] = [];
  selectedUser: any = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers(1, 20);
  }

  fetchUsers(pageNumber: number, pageSize: number): void {
    this.adminService.fetchUsers(pageNumber, pageSize).subscribe((response) => {
      this.users = response.users;
      this.filterUsersByStatus();
    });
  }

  filterUsersByStatus(): void {
    this.activeUsers = this.users.filter((user) => user.isActive);
    this.inactiveUsers = this.users.filter((user) => !user.isActive);
  }

  deleteUser(userId: number): void {
    this.adminService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter((user) => user.userId !== userId);
      this.filterUsersByStatus();
      alert('User deleted successfully!');
    });
  }

  viewDetails(userId: number): void {
    this.adminService.getUserDetails(userId).subscribe((response) => {
      this.selectedUser = response;
      const modal = new (window as any).bootstrap.Modal(
        document.getElementById('userDetailsModal')
      );
      modal.show();
    });
  }
}

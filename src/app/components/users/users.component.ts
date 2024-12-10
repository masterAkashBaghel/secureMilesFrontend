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
  selectedUser: any = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers(1, 20);
  }

  /**
   * Fetches users using the AdminService and updates the UI.
   * @param pageNumber The page number to fetch.
   * @param pageSize The number of users to fetch per page.
   */
  fetchUsers(pageNumber: number, pageSize: number): void {
    this.adminService.fetchUsers(pageNumber, pageSize).subscribe((response) => {
      this.users = response.users;
    });
  }

  /**
   * Deletes a user using the AdminService and updates the UI.
   * @param userId The ID of the user to delete.
   */
  deleteUser(userId: number): void {
    this.adminService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter((user) => user.userId !== userId);
      alert('User deleted successfully!');
    });
  }

  /**
   * Fetches the details of a specific user using the AdminService and displays a modal.
   * @param userId The ID of the user to fetch details for.
   */
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

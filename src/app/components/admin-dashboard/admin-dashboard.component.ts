import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  cards = [
    {
      title: 'Users',
      desc: 'List of total registered users in the system',
      count: 0,
      image: '/public/assets/images/admindb1.png',
      link: '/admin/users',
    },
    {
      title: 'Claims',
      desc: 'Total number of claims submitted by users',
      count: 0,
      image: '/public/assets/images/admindb2.png',
      link: '/admin/claims',
    },
    {
      title: 'Policy',
      desc: 'Total number of policies in the system',
      count: 0,
      image: '/public/assets/images/admindb3.png',
      link: '/admin/policies',
    },
    {
      title: 'Proposals',
      desc: 'Proposals submitted by users for new policies',
      count: 0,
      image: '/public/assets/images/admindb4.png',
      link: '/admin/proposals',
    },
  ];

  errorMessage: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService
      .getAdminDashboardData()
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to load dashboard data';
          console.error('Error loading dashboard data', error);
          return of(null); // Return a null observable to continue the stream
        })
      )
      .subscribe((data) => {
        if (data) {
          this.cards[0].count = data.totalUsers;
          this.cards[1].count = data.totalClaims;
          this.cards[2].count = data.totalPolicies;
          this.cards[3].count = data.totalProposals;
        }
      });
  }
}

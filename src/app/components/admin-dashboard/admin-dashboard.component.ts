import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxChartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  cards = [
    {
      title: 'Users',
      desc: 'Total registered users in the system',
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
      title: 'Policies',
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
    {
      title: 'Vehicles',
      desc: 'Total number of vehicles registered',
      count: 0,
      image: '/public/assets/images/carEx.png',
      link: '/admin/vehicles',
    },
  ];

  charts: {
    policiesByMonth: { name: string; value: any }[];
    claimsByMonth: { name: string; value: any }[];
    proposalsByMonth: { name: string; value: any }[];
  } = {
    policiesByMonth: [],
    claimsByMonth: [],
    proposalsByMonth: [],
  };

  errorMessage: string | null = null;

  constructor(
    private adminService: AdminService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.adminService
      .getAdminDashboardData()
      .pipe(
        catchError((error) => {
          this.toastService.showErrorToast('Failed to load dashboard data');
          this.errorMessage = 'Failed to load dashboard data';
          console.error('Error loading dashboard data', error);
          return of(null); // Return a null observable to continue the stream
        })
      )
      .subscribe((data) => {
        if (data) {
          // Assign counts to cards
          this.cards[0].count = data.totalUsers;
          this.cards[1].count = data.totalClaims;
          this.cards[2].count = data.totalPolicies;
          this.cards[3].count = data.totalProposals;
          this.cards[4].count = data.totalVehicles;

          // Assign data to charts
          this.charts.policiesByMonth = [
            { name: 'Policies', value: data.policiesLastMonth },
            { name: 'Policies Last Year', value: data.policiesLastYear },
          ];

          this.charts.claimsByMonth = [
            { name: 'Claims', value: data.claimsLastMonth },
            { name: 'Claims Last Year', value: data.claimsLastYear },
          ];

          this.charts.proposalsByMonth = [
            { name: 'Proposals', value: data.proposalsLastMonth },
            { name: 'Proposals Last Year', value: data.proposalsLastYear },
          ];
        }
      });
  }
}

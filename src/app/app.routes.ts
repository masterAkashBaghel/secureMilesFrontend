import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactComponent } from './components/contact/contact.component';
import { CarInsuranceComponent } from './components/car-insurance/car-insurance.component';
import { BikeInsuranceComponent } from './components/bike-insurance/bike-insurance.component';
import { TruckInsuranceComponent } from './components/truck-insurance/truck-insurance.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { ProfileComponent } from './components/profile/profile.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { ProposalComponent } from './components/proposals/proposals.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { AdminClaimsComponent } from './components/admin-claims/admin-claims.component';
import { AdminPoliciesComponent } from './components/admin-policies/admin-policies.component';
import { AdminProposalsComponent } from './components/admin-proposals/admin-proposals.component';
import { PolicyComponent } from './components/policy/policy.component';
export const routes: Routes = [
  { path: '', component: DashboardComponent }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'car-insurance', component: CarInsuranceComponent },
  { path: 'bike-insurance', component: BikeInsuranceComponent },
  { path: 'truck-insurance', component: TruckInsuranceComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'insurance',
    component: InsuranceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'proposals',
    component: ProposalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/claims',
    component: AdminClaimsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/policies',
    component: AdminPoliciesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/proposals',
    component: AdminProposalsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'policy',
    component: PolicyComponent,
    canActivate: [AuthGuard],
  },
];

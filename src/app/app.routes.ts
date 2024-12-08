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
 ];

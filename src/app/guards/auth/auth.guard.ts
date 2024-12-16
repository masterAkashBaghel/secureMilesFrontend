import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('role'); // Get role from localStorage

    if (!token) {
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }

    const requiredRoles = route.data['roles'] || [];
    if (requiredRoles.length && !requiredRoles.includes(userRole)) {
      this.router.navigate(['/unauthorized']); // Redirect to unauthorized if role is not sufficient
      return false;
    }

    return true;
  }
}

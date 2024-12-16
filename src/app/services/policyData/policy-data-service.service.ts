import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PolicyDataService {
  private policies: any[] = [];

  setPolicies(policies: any[]): void {
    this.policies = policies;
  }

  getPolicies(): any[] {
    return this.policies;
  }
}

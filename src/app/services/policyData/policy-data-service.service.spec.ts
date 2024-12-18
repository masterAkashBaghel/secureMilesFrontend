import { TestBed } from '@angular/core/testing';

import { PolicyDataService } from './policy-data-service.service';

describe('PolicyDataServiceService', () => {
  let service: PolicyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

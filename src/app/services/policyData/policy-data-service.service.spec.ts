import { TestBed } from '@angular/core/testing';

import { PolicyDataServiceService } from './policy-data-service.service';

describe('PolicyDataServiceService', () => {
  let service: PolicyDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProductionDetailsServiceService } from './production-details-service.service';

describe('ProductionDetailsServiceService', () => {
  let service: ProductionDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

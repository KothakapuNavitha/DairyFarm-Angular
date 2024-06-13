import { TestBed } from '@angular/core/testing';

import { ProductionServiceService } from './production-service.service';

describe('ProductionServiceService', () => {
  let service: ProductionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

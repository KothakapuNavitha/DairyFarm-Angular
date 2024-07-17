import { TestBed } from '@angular/core/testing';

import { PurchaseRepotsService } from './purchase-repots.service';

describe('PurchaseRepotsService', () => {
  let service: PurchaseRepotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseRepotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

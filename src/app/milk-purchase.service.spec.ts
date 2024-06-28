import { TestBed } from '@angular/core/testing';

import { MilkPurchaseService } from './milk-purchase.service';

describe('MilkPurchaseService', () => {
  let service: MilkPurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilkPurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

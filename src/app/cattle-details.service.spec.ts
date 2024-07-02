import { TestBed } from '@angular/core/testing';

import { CattleDetailsService } from './cattle-details.service';

describe('CattleDetailsService', () => {
  let service: CattleDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattleDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

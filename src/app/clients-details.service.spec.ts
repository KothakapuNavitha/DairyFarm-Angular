import { TestBed } from '@angular/core/testing';

import { ClientsDetailsService } from './clients-details.service';

describe('ClientsDetailsService', () => {
  let service: ClientsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

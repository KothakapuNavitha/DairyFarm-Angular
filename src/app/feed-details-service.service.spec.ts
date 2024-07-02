import { TestBed } from '@angular/core/testing';

import { FeedDetailsServiceService } from './feed-details-service.service';

describe('FeedDetailsServiceService', () => {
  let service: FeedDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

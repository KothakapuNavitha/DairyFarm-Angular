import { TestBed } from '@angular/core/testing';

import { LoaderinterceptorService } from './loaderinterceptor.service';

describe('LoaderinterceptorService', () => {
  let service: LoaderinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

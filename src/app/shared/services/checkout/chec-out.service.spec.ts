import { TestBed } from '@angular/core/testing';

import { ChecOutService } from './chec-out.service';

describe('ChecOutService', () => {
  let service: ChecOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

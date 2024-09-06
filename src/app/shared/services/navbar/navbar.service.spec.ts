import { TestBed } from '@angular/core/testing';

import { NavbarrService } from './navbarr.service';

describe('NavbarrService', () => {
  let service: NavbarrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

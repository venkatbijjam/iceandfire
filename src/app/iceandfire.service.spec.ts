import { TestBed, inject } from '@angular/core/testing';

import { IceandfireService } from './iceandfire.service';

describe('IceandfireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IceandfireService]
    });
  });

  it('should be created', inject([IceandfireService], (service: IceandfireService) => {
    expect(service).toBeTruthy();
  }));
});

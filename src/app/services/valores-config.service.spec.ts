import { TestBed } from '@angular/core/testing';

import { ValoresConfigService } from './valores-config.service';

describe('ValoresConfigService', () => {
  let service: ValoresConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoresConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

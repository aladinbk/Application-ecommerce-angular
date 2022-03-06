import { TestBed, inject } from '@angular/core/testing';

import { CaddyService } from './caddy.service';

describe('CaddyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaddyService]
    });
  });

  it('should be created', inject([CaddyService], (service: CaddyService) => {
    expect(service).toBeTruthy();
  }));
});

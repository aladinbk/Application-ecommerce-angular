import { TestBed, inject } from '@angular/core/testing';

import { OrdreService } from './ordre.service';

describe('OrdreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdreService]
    });
  });

  it('should be created', inject([OrdreService], (service: OrdreService) => {
    expect(service).toBeTruthy();
  }));
});

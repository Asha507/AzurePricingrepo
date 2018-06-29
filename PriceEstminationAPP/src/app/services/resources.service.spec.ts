import { TestBed, inject } from '@angular/core/testing';

import { Services\ResourcesService } from './services\resources.service';

describe('Services\ResourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Services\ResourcesService]
    });
  });

  it('should be created', inject([Services\ResourcesService], (service: Services\ResourcesService) => {
    expect(service).toBeTruthy();
  }));
});

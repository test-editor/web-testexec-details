import { TestBed, inject } from '@angular/core/testing';

import { TestPropertiesOrganizerService } from './test-properties-organizer.service';

describe('TestPropertiesOrganizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestPropertiesOrganizerService]
    });
  });

  it('should be created', inject([TestPropertiesOrganizerService], (service: TestPropertiesOrganizerService) => {
    expect(service).toBeTruthy();
  }));
});

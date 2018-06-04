import { TestBed, inject } from '@angular/core/testing';

import { TestExecutionDetailsService } from './test-execution-details.service';

describe('TestExecutionDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestExecutionDetailsService]
    });
  });

  it('should be created', inject([TestExecutionDetailsService], (service: TestExecutionDetailsService) => {
    expect(service).toBeTruthy();
  }));
});

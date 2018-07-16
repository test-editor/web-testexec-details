import { TestBed, inject } from '@angular/core/testing';

import { ResourceService, DefaultResourceService } from './resource.service';
import { mock, instance } from 'ts-mockito/lib/ts-mockito';

describe('ResourceService', () => {
  const mockedResourceService = mock(DefaultResourceService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ResourceService, useValue: instance(mockedResourceService)}]
    });
  });

  it('should be created', inject([ResourceService], (service: ResourceService) => {
    expect(service).toBeTruthy();
  }));
});

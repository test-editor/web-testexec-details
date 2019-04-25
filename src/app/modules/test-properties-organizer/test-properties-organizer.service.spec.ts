import { inject, TestBed } from '@angular/core/testing';
import { TestPropertiesOrganizerServiceConfig } from './test-properties-organizer-service-config';
import { TestPropertiesOrganizerService } from './test-properties-organizer.service';


describe('TestPropertiesOrganizerService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestPropertiesOrganizerService,
        { provide: TestPropertiesOrganizerServiceConfig, useValue: { propertyPriorityMap: {} } }]
    });
  });

  it('should be created', inject([TestPropertiesOrganizerService], (service: TestPropertiesOrganizerService) => {
    expect(service).toBeTruthy();
  }));

  it('should sort by alphabet if no priorities are set',
    inject([TestPropertiesOrganizerService, TestPropertiesOrganizerServiceConfig],
      (service: TestPropertiesOrganizerService, config: TestPropertiesOrganizerServiceConfig) => {
        // given
        const unsorted = ['zeta', 'gamma', 'alpha', 'omega', 'lambda', 'beta', 'delta', 'epsilon'];
        const sorted = ['alpha', 'beta', 'delta', 'epsilon', 'gamma', 'lambda', 'omega', 'zeta'];

        // when
        const actual = service.organizeNames(unsorted);

        // then
        expect(actual).toEqual(sorted);
        expect(unsorted).not.toEqual(sorted);
      }));

  it('should put buckets with higher index to the top, and sort each bucket alphabetically',
    inject([TestPropertiesOrganizerService, TestPropertiesOrganizerServiceConfig],
      (service: TestPropertiesOrganizerService, config: TestPropertiesOrganizerServiceConfig) => {
        // given
        config.propertyPriorityMap['zeta'] = 100;
        config.propertyPriorityMap['delta'] = 100;
        config.propertyPriorityMap['omega'] = 101;
        config.propertyPriorityMap['epsilon'] = 0;
        config.propertyPriorityMap['beta'] = -42;
        const unsorted = ['zeta', 'gamma', 'alpha', 'omega', 'lambda', 'beta', 'delta', 'epsilon'];
        const sorted = ['omega', 'delta', 'zeta', 'alpha', 'epsilon', 'gamma', 'lambda', 'beta'];

        // when
        const actual = service.organizeNames(unsorted);

        // then
        expect(actual).toEqual(sorted);
        expect(unsorted).not.toEqual(sorted);
      }));

  it('should sort objects by their properties',
    inject([TestPropertiesOrganizerService, TestPropertiesOrganizerServiceConfig],
      (service: TestPropertiesOrganizerService, config: TestPropertiesOrganizerServiceConfig) => {
        // given
        config.propertyPriorityMap['zeta'] = 100;
        config.propertyPriorityMap['delta'] = 100;
        config.propertyPriorityMap['omega'] = 101;
        config.propertyPriorityMap['epsilon'] = 0;
        config.propertyPriorityMap['beta'] = -42;
        const unsortedObject = {
          'zeta': 'z', 'gamma': 'g', 'alpha': 'a',
          'omega': '42', 'lambda': {}, 'beta': null,
          'delta': 'values shouldn\'t matter', 'epsilon': []
        };
        const sorted = ['omega', 'delta', 'zeta', 'alpha', 'epsilon', 'gamma', 'lambda', 'beta'];

        // when
        const actual = service.organize(unsortedObject);

        // then
        expect(Object.keys(actual)).toEqual(sorted);
        expect(actual).toEqual(unsortedObject);
        expect(actual).not.toBe(unsortedObject);
  }));

  fit('should ignore prioritized properties that are not present in the unsorted object',
   inject([TestPropertiesOrganizerService, TestPropertiesOrganizerServiceConfig],
      (service: TestPropertiesOrganizerService, config: TestPropertiesOrganizerServiceConfig) => {
    // given
    config.propertyPriorityMap['nonExistingProperty'] = 100;
    config.propertyPriorityMap['omega'] = 200;
    const unsortedObject = {
      'zeta': 'z', 'gamma': 'g', 'alpha': 'a',
      'omega': '42', 'lambda': {}, 'beta': null,
      'delta': 'values shouldn\'t matter', 'epsilon': []
    };
    const sorted = ['omega', 'alpha', 'beta', 'delta', 'epsilon', 'gamma', 'lambda', 'zeta'];

    // when
    const actual = service.organize(unsortedObject);

    // then
    expect(Object.keys(actual)).toEqual(sorted);
    expect(actual).toEqual(unsortedObject);
    expect(actual).not.toBe(unsortedObject);
  }));
});

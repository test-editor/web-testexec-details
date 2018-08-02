import { TestBed, inject } from '@angular/core/testing';

import { TestPropertiesPrettifierService, PropertiesPrettifierService } from './test-properties-prettifier.service';

describe('TestPropertiesPrettifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PropertiesPrettifierService, useClass: TestPropertiesPrettifierService }
      ]
    });
  });

  function sampleProperties() {
    return {
      'aCamelCaseKey': 'content',
      'nullPointer': null,
      'nothingToReport': '',
      'ALLCAPS': 'content',
      'StartsWithCapitalLetter': 'content',
      'Pre-Formatted Key': 'content',
      'enter': '456789',
      'leave': '8142123456789' /* duration: 2 h 15 min 42.123 s */
    };
  }

  it('should be created', inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
    expect(service).toBeTruthy();
  }));

  it('removes fields that are null"',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = sampleProperties();

      // when
      const actualResult = service.prettify(properties);

      // then
      Object.keys(actualResult).forEach((key) => expect(actualResult[key]).not.toBeNull());
    }));

    it('removes fields that are empty"',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = sampleProperties();

      // when
      const actualResult = service.prettify(properties);

      // then
      Object.keys(actualResult).forEach((key) => expect(actualResult[key]).not.toEqual(''));
    }));

  it('converts "camelCase" keys into "Title Case"',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = sampleProperties();

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['aCamelCaseKey']).toBeFalsy();
      expect(actualResult['A Camel Case Key']).toEqual('content');
    }));

  it('leaves all-caps keys unchanged"',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = sampleProperties();

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['ALLCAPS']).toEqual('content');
      expect(actualResult[' A L L C A P S']).toBeFalsy();
    }));

  it('does not insert leading spaces"',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = sampleProperties();

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Starts With Capital Letter']).toEqual('content');
      expect(actualResult[' Starts With Capital Letter']).toBeFalsy();
      expect(actualResult['StartsWithCapitalLetter']).toBeFalsy();
    }));

  it('only inserts space before capital letter if previous character was a lower-case letter"',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = sampleProperties();

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Pre- Formatted  Key']).toBeFalsy();
      expect(actualResult['Pre-Formatted Key']).toEqual('content');
    }));

  it('does not change anything if applied a second time"',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const prettyProperties = service.prettify(sampleProperties());

      // when
      const actualResult = service.prettify(prettyProperties);

      // then
      expect(actualResult).toEqual(prettyProperties);
    }));

  it('replaces enter and leave properties with a human-readable "Duration" property',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = sampleProperties();

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['enter']).toBeFalsy();
      expect(actualResult['Enter']).toBeFalsy();
      expect(actualResult['leave']).toBeFalsy();
      expect(actualResult['Leave']).toBeFalsy();
      expect(actualResult['Duration']).toEqual('2 h 15 min 42.123 s');
    }));

  it('only outputs nanoseconds if duration is less than one microsecond',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = {
        'enter': '87',
        'leave': '129'
      };

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Duration']).toEqual('42 ns');
    }));

  it('only outputs microseconds and discards nanoseconds if duration is less than one millisecond',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = {
        'enter': '54123',
        'leave': '96456'
      };

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Duration']).toEqual('42 µs');
    }));

  it('only outputs milliseconds and discards micro- and nanoseconds if duration is less than one second',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = {
        'enter': '54123321',
        'leave': '96456789'
      };

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Duration']).toEqual('42 ms');
    }));

  it('only outputs milliseconds and discards micro- and nanoseconds if duration is less than one second',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = {
        'enter': '54123321',
        'leave': '96456789'
      };

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Duration']).toEqual('42 ms');
    }));

  it('outputs seconds with three decimal digits if duration is less than a minute',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = {
        'enter': '54123321123',
        'leave': '96456789987'
      };

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Duration']).toEqual('42.333 s');
    }));

  it('outputs minutes and seconds if duration is less than an hour',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = {
        'enter': '5412332112345',
        'leave': '6834665198765'
      };

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Duration']).toEqual('23 min 42.333 s');
    }));

  it('outputs hours, minutes, and seconds if duration is at least an hour',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = {
        'enter':  '54123321123456',
        'leave': '109545654567890'
      };

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Duration']).toEqual('15 h 23 min 42.333 s');
    }));

    it('outputs a bracketed warning instead of a duration if the "leave" property is missing',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = {
        'enter':  '1000'
      };

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Duration']).toEqual('<faulty data: missing "leave" timestamp>');
    }));

    it('outputs a bracketed warning instead of a duration if the duration would be negative',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = {
        'enter':  '1000',
        'leave': '999'
      };

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Duration']).toEqual('<faulty data: negative duration>');
    }));

    it('outputs the correct duration if one timestamp is negative',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = {
        'enter':  '-2740976400000',
        'leave': '52681357000000'
      };

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Duration']).toEqual('15 h 23 min 42.333 s');
    }));

    it('outputs the correct duration if both timestamp are negative',
    inject([PropertiesPrettifierService], (service: PropertiesPrettifierService<object>) => {
      // given
      const properties = {
        'enter':  '-109545654567890',
        'leave': '-54123321123456'
      };

      // when
      const actualResult = service.prettify(properties);

      // then
      expect(actualResult['Duration']).toEqual('15 h 23 min 42.333 s');
    }));
});

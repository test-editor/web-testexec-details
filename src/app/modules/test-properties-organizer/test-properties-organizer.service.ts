import { Injectable } from '@angular/core';
import { TestPropertiesOrganizerServiceConfig } from './test-properties-organizer-service-config';

export abstract class PropertiesOrganizerService {
  abstract organize(propertyNames: string[]): string[];
}

type BucketList = Record<number, string[]>;

/**
 * Bucket-sorts an array of property names based on the configured priorities.
 * 
 * The config may contain a map that assigns numeric values to known property names.
 * Property names with a higher numeric value are put to the top of the list, those
 * with lower values are moved down. Negative values are allowed. Property names
 * that are not explicitly assigned a value are implicitly assigned a value of '0'.
 * Property names in the same bucket are sorted alphabetically (ASCII-order).
 */
@Injectable()
export class TestPropertiesOrganizerService implements PropertiesOrganizerService {

  constructor(private config: TestPropertiesOrganizerServiceConfig) { }

  organize(propertyNames: string[]): string[] {
    const result: string[] = [];
    const bucketLists = this.bucketsFrom(propertyNames);
    this.bucketsByPriority().forEach((index) => result.push(...(bucketLists[index].sort())));
    return result;
  }

  bucketsFrom(propertyNames: string[]): BucketList {
    const result: BucketList = {};
    propertyNames.forEach((name) => {
      const bucket = this.bucketOf(name);
      if (result[bucket]) {
        result[bucket].push(name);
      } else {
        result[bucket] = [name];
      }
    })
    return result;
  }

  bucketOf(name: string): number {
    if (this.config.propertyPriorityMap[name]) {
      return this.config.propertyPriorityMap[name];
    } else {
      return 0;
    }
  }

  bucketsByPriority(): Set<number> {
    return new Set<number>(
      Object.values(this.config.propertyPriorityMap)
        .concat([0])
        .sort((index1, index2) => index2 - index1)
    );
  }

}

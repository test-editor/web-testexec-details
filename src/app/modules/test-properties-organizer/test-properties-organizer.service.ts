import { Injectable } from '@angular/core';
import { TestPropertiesOrganizerServiceConfig } from './test-properties-organizer-service-config';

export abstract class PropertiesOrganizerService {
  abstract organize(propertyNames: string[]): string[];
}

@Injectable()
export class TestPropertiesOrganizerService implements PropertiesOrganizerService {

constructor(private config: TestPropertiesOrganizerServiceConfig) {}

  organize(propertyNames: string[]): string[] {
    throw new Error('Method not implemented.');
  }

}

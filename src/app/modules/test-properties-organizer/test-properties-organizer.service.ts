import { Injectable } from '@angular/core';

export abstract class PropertiesOrganizerService {
  abstract organize(propertyNames: string[]): string[];
}

@Injectable()
export class TestPropertiesOrganizerService implements PropertiesOrganizerService {

  organize(propertyNames: string[]): string[] {
    throw new Error('Method not implemented.');
  }

}

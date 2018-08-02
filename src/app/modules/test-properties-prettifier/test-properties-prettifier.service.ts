import { Injectable } from '@angular/core';

export abstract class PropertiesPrettifierService<T> {
  abstract prettify(properties: T): T;
}

@Injectable()
export class TestPropertiesPrettifierService implements PropertiesPrettifierService<object> {
  private readonly START_KEY = 'enter';
  private readonly FINISH_KEY = 'leave';
  private readonly DURATION_KEY = 'Duration';


  prettify(properties: object): object {
    properties = this.startAndFinishTimeToDuration(properties);
    Object.keys(properties).forEach((oldKey) => {
      if (properties[oldKey]) {
        const newKey = this.camelCaseToTitleCase(oldKey);
        if (oldKey !== newKey) {
          properties[newKey] = properties[oldKey];
          delete properties[oldKey];
        }
      } else {
        delete properties[oldKey];
      }
    });
    return properties;
  }

  /**
   *  insert spaces before each upper-case letter and capitalize first letter
   */
  camelCaseToTitleCase(camelCaseTerm: string): string {
    const termWithSpaces = camelCaseTerm.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
    return termWithSpaces.charAt(0).toUpperCase() + termWithSpaces.slice(1);
  }

  startAndFinishTimeToDuration(properties: object): object {
    if (properties[this.START_KEY] && properties[this.FINISH_KEY]) {
      const nanosecondDuration = properties[this.FINISH_KEY] - properties[this.START_KEY];
      if (nanosecondDuration < 0) {
        properties[this.DURATION_KEY] = '<faulty data: negative duration>';
      } else {
        properties[this.DURATION_KEY] = this.formatNanoseconds(nanosecondDuration);
      }

      delete properties[this.START_KEY];
      delete properties[this.FINISH_KEY];
    }

    return properties;
  }

  formatNanoseconds(nanoseconds: number): string {
    const microseconds = Math.floor(nanoseconds / 1e3) % 1000;
    const milliseconds = Math.floor(nanoseconds / 1e6) % 1000;
    const seconds = Math.floor(nanoseconds / 1e9) % 60;
    const minutes = Math.floor(nanoseconds / 6e10) % 60;
    const hours = Math.floor(nanoseconds / 3.6e12) % 60;

    let humanReadableTime: string;
    if (nanoseconds < 1000) {
      humanReadableTime = nanoseconds.toString() + ' ns';
    } else if (nanoseconds < 1e6) {
      humanReadableTime = microseconds.toString() + ' µs';
    } else if (nanoseconds < 1e9) {
      humanReadableTime = milliseconds.toString() + ' ms';
    } else {
      humanReadableTime = `${seconds}.${milliseconds} s`;
      if (nanoseconds >= 6e10) {
        humanReadableTime = minutes + ' min ' + humanReadableTime;
        if (nanoseconds >= 3.6e12) {
          humanReadableTime = hours + ' h ' + humanReadableTime;
        }
      }
    }

    return humanReadableTime;
  }

}

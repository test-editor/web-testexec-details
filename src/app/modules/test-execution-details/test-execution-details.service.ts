import { Injectable } from '@angular/core';

export interface TestExecutionDetails {

}

export abstract class TestExecutionDetailsService {
  abstract getTestExecutionDetails(
    jobID: number,
    onResponse?: (details: TestExecutionDetails) => void,
    onError?: (error: any) => void
  ): void;
}

@Injectable()
export class DefaultTestExecutionDetailsService extends TestExecutionDetailsService {

  getTestExecutionDetails(jobID: number, onResponse?: (details: TestExecutionDetails) => void, onError?: (error: any) => void): void {
    throw new Error('Method not implemented.');
  }
  constructor() { super(); }

}

import { Injectable } from '@angular/core';

export enum DataKind {
  text,
  image,
  properties
}

export interface TestExecutionDetails {
  type: DataKind;
  content: any;
}

export interface TestRunID {
  /**
   * ID of a test suite. A test suite is a sequence of tests to be executed.
   * The same test can be contained multiple times in a test suite,
   * to be executed at different points in the sequence.
   */
  testSuiteID: number;
  /**
   * ID of a test suite run, i.e. a particular execution of a test suite.
   */
  testSuiteRunID: number;
  /**
   * ID of a test run, i.e. a particular execution of a single test.
   */
  testRunID: number;
  /**
   * ID of a call tree node, e.g. a particular test step of the test referenced by the test run ID.
   */
  treeID: number;
}


export abstract class TestExecutionDetailsService {
  abstract getTestExecutionDetails(
    id: TestRunID,
    onResponse?: (details: TestExecutionDetails[]) => void,
    onError?: (error: any) => void
  ): void;
}

@Injectable()
export class DefaultTestExecutionDetailsService extends TestExecutionDetailsService {

  getTestExecutionDetails(jobID: TestRunID, onResponse?: (details: TestExecutionDetails[]) => void, onError?: (error: any) => void): void {
    throw new Error('Method not implemented.');
  }
  constructor() { super(); }

}

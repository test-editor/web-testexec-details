import { Injectable } from '@angular/core';
import { HttpProviderService } from '../http-provider-service/http-provider.service';
import { TestExecutionDetailsServiceConfig } from './test-execution-details-service-config';

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
  abstract async getTestExecutionDetails(id: TestRunID): Promise<TestExecutionDetails[]>;
}

@Injectable()
export class DefaultTestExecutionDetailsService extends TestExecutionDetailsService {

  constructor(private httpProvider: HttpProviderService, private config: TestExecutionDetailsServiceConfig) { super(); }

  async getTestExecutionDetails(jobID: TestRunID): Promise<TestExecutionDetails[]> {
    const client = await this.httpProvider.getHttpClient();
    return await client.get<TestExecutionDetails[]>(this.getURL(jobID)).toPromise();
  }

  private getURL(job: TestRunID): string {
    const url = `${this.config.url}/${job.testSuiteID}/${job.testSuiteRunID}/${job.testRunID}/${job.treeID}`;
    console.log('URL IS ' + url);
    return url;
  }

}

import { Injectable } from '@angular/core';
import { HttpProviderService } from '../http-provider-service/http-provider.service';
import { TestExecutionDetailsServiceConfig } from './test-execution-details-service-config';
import { TestRunId, isTestRunId } from '../details/test-run-id';

export enum DataKind {
  text = 'text',
  image = 'image',
  properties = 'properties'
}

export interface TestExecutionDetails {
  type: DataKind;
  content: any;
}

export abstract class TestExecutionDetailsService {
  abstract async getTestExecutionDetails(id: TestRunId): Promise<TestExecutionDetails[]>;
}

@Injectable()
export class DefaultTestExecutionDetailsService extends TestExecutionDetailsService {

  constructor(private httpProvider: HttpProviderService, private config: TestExecutionDetailsServiceConfig) { super(); }

  async getTestExecutionDetails(jobID: TestRunId): Promise<TestExecutionDetails[]> {
    if (isTestRunId(jobID)) {
      const client = await this.httpProvider.getHttpClient();
      return await client.get<TestExecutionDetails[]>(this.getURL(jobID)).toPromise();
    } else {
      return null;
    }

  }

  private getURL(job: TestRunId): string {
    return `${this.config.url}/${job.toPathString()}`;
  }

}

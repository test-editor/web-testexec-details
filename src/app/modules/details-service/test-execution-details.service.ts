import { Injectable } from '@angular/core';
import { HttpProviderService } from '../http-provider-service/http-provider.service';
import { TestExecutionDetailsServiceConfig } from './test-execution-details-service-config';

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
  abstract async getTestExecutionDetails(id: string): Promise<TestExecutionDetails[]>;
}

@Injectable()
export class DefaultTestExecutionDetailsService extends TestExecutionDetailsService {

  constructor(private httpProvider: HttpProviderService, private config: TestExecutionDetailsServiceConfig) { super(); }

  async getTestExecutionDetails(jobID: string): Promise<TestExecutionDetails[]> {
    const client = await this.httpProvider.getHttpClient();
    return await client.get<TestExecutionDetails[]>(`${this.config.url}/${jobID}`).toPromise();
  }
}

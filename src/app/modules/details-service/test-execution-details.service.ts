import { Injectable } from '@angular/core';
import { HttpProviderService } from '../http-provider-service/http-provider.service';
import { TestExecutionDetailsServiceConfig } from './test-execution-details-service-config';

export enum LogLevel {
  CRITICAL = 'CRITICAL',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  TRACE = 'TRACE'
}

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
  abstract async getTestExecutionDetails(id: string, logLevel?: LogLevel): Promise<TestExecutionDetails[]>;
}

@Injectable()
export class DefaultTestExecutionDetailsService extends TestExecutionDetailsService {

  constructor(private httpProvider: HttpProviderService, private config: TestExecutionDetailsServiceConfig) { super(); }

  async getTestExecutionDetails(jobID: string, logLevel?: LogLevel): Promise<TestExecutionDetails[]> {
    const client = await this.httpProvider.getHttpClient();
    let url = `${this.config.url}/${jobID}`;
    if (logLevel) {
      url = `${url}?logLevel=${logLevel}`;
    }
    return await client.get<TestExecutionDetails[]>(url).toPromise();
  }
}

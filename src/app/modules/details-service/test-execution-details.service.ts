import { Injectable } from '@angular/core';
import { HttpProviderService } from '@testeditor/testeditor-commons';
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
  abstract async getTestExecutionLog(id: string, logLevel?: LogLevel): Promise<TestExecutionDetails[]>;
}

@Injectable()
export class DefaultTestExecutionDetailsService extends TestExecutionDetailsService {

  constructor(private httpProvider: HttpProviderService, private config: TestExecutionDetailsServiceConfig) { super(); }

  async getTestExecutionDetails(jobID: string, logLevel?: LogLevel): Promise<TestExecutionDetails[]> {
    return await this.makeRequest(logLevel ? `${jobID}?logLevel=${logLevel}` : jobID);
  }

  async getTestExecutionLog(jobID: string, logLevel?: LogLevel): Promise<TestExecutionDetails[]> {
    const path = `${jobID}?logOnly=true`;
    return await this.makeRequest(logLevel ? `${path}&logLevel=${logLevel}` : path);
  }

  private async makeRequest(urlPathAndQuery: string): Promise<TestExecutionDetails[]> {
    const client = await this.httpProvider.getHttpClient();
    return await client.get<TestExecutionDetails[]>(`${this.config.url}/details/${urlPathAndQuery}`).toPromise();
  }
}

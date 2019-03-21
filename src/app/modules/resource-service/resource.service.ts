import { Injectable } from '@angular/core';
import { HttpProviderService } from '@testeditor/testeditor-commons';
import { ResourceServiceConfig } from './resource-service-config';

export abstract class ResourceService {
  abstract async getBinaryResource(path: string): Promise<Blob>;
}

@Injectable()
export class DefaultResourceService extends ResourceService {

  constructor(private httpProvider: HttpProviderService, private config: ResourceServiceConfig) { super(); }

  async getBinaryResource(path: string): Promise<Blob> {
    const client = await this.httpProvider.getHttpClient();
    return await client.get(`${this.config.resourceServiceUrl}/documents/${path}`, { responseType: 'blob' }).toPromise();
  }
}

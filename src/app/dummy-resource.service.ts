import { ResourceService } from './modules/resource-service/resource.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DummyResourceService extends ResourceService {
  dummyImageUrl = 'http://testeditor.org/wp-content/uploads/2014/05/05-narrow-de-300x187.png';

  constructor(private http: HttpClient) { super(); }

  getBinaryResource(path: string): Promise<Blob> {
    return this.http.get(this.dummyImageUrl, { responseType: 'blob' }).toPromise();
  }
}

import { TestBed, inject, fakeAsync, tick, flush } from '@angular/core/testing';

import { TestExecutionDetailsService, DefaultTestExecutionDetailsService,
  TestExecutionDetails, DataKind } from './test-execution-details.service';
import { TestExecutionDetailsServiceConfig } from './test-execution-details-service-config';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessagingModule, MessagingService } from '@testeditor/messaging-service';
import { HttpProviderService } from '../http-provider-service/http-provider.service';
import { TestRunId } from '../details/test-run-id';

describe('TestExecutionDetailsService', () => {
  let serviceConfig: TestExecutionDetailsServiceConfig;
  let messagingService: MessagingService;
  let mockClient: HttpClient;

  beforeEach(() => {
    serviceConfig = { url: 'http://localhost:9080/test-details' };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        MessagingModule.forRoot()
      ],
      providers: [
        { provide: TestExecutionDetailsService, useClass: DefaultTestExecutionDetailsService },
        { provide: TestExecutionDetailsServiceConfig, useValue: serviceConfig },
        HttpProviderService,
        HttpClient
      ]
    });

    messagingService = TestBed.get(MessagingService);
    mockClient = TestBed.get(HttpClient);

    const subscription = messagingService.subscribe('httpClient.needed', () => {
      subscription.unsubscribe();
      messagingService.publish('httpClient.supplied', { httpClient: mockClient });
    });
  });

  it('should be created', inject([TestExecutionDetailsService], (service: TestExecutionDetailsService) => {
    expect(service).toBeTruthy();
  }));

  it('makes correct HTTP call', fakeAsync(inject([HttpTestingController, TestExecutionDetailsService],
    (httpController: HttpTestingController, service: TestExecutionDetailsService) => {
    // given
    const id = new TestRunId('42', '1', '2', '23');
    const testExecutionRequest = {
      method: 'GET',
      url: serviceConfig.url + '/42/1/2/23'
    };
    const mockResponse: TestExecutionDetails[] = [{ type: DataKind.text, content: 'Hello World!' }];

    // when
    service.getTestExecutionDetails(id).

    // then
    then((details) => {
      expect(details).toEqual(mockResponse);
    });
    tick();
    httpController.match(testExecutionRequest)[0].flush(mockResponse);
  })));
});

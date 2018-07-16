import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestExecDetailsModule } from './modules/details/test-exec-details.module';
import { MessagingModule } from '@testeditor/messaging-service';
import { TestExecutionDetailsService } from './modules/details-service/test-execution-details.service';
import { DummyTestExecutionDetailsService } from './dummy-test-execution-details.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResourceService } from './modules/resource-service/resource.service';
import { DummyResourceService } from './dummy-resource.service';
import { FileReaderProvider, DefaultFileReaderProvider } from './modules/details/test-exec-details.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TestExecDetailsModule.forRoot({url: 'http://localhost:9080/test-details'}, {resourceServiceUrl: 'http://localhost:9080'}),
    MessagingModule.forRoot(),
  ],
  providers: [
    HttpClient,
    { provide: TestExecutionDetailsService, useClass: DummyTestExecutionDetailsService },
    { provide: ResourceService, useClass: DummyResourceService },
    { provide: FileReaderProvider, useClass: DefaultFileReaderProvider }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

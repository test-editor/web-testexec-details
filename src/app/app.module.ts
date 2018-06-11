import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestExecDetailsModule } from './modules/details/test-exec-details.module';
import { MessagingModule } from '@testeditor/messaging-service';
import { TestExecutionDetailsService } from './modules/details-service/test-execution-details.service';
import { DummyTestExecutionDetailsService } from './dummy-test-execution-details.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TestExecDetailsModule.forRoot({url: 'http://localhost:9080/test-details'}),
    MessagingModule.forRoot(),
  ],
  providers: [
    { provide: TestExecutionDetailsService, useClass: DummyTestExecutionDetailsService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

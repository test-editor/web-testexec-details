import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestExecDetailsModule } from './modules/details/test-exec-details.module';
import { MessagingModule } from '@testeditor/messaging-service';
import { TestExecutionDetailsService } from './modules/test-execution-details/test-execution-details.service';
import { DefaultTestExecutionDetailsService } from './modules/test-execution-details/test-execution-details.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TestExecDetailsModule,
    MessagingModule.forRoot(),
  ],
  providers: [
    { provide: TestExecutionDetailsService, useClass: DefaultTestExecutionDetailsService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

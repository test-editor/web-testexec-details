import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestExecDetailsModule } from './modules/details/test-exec-details.module';
import { MessagingModule } from '@testeditor/messaging-service';
import { DefaultTestExecutionDetailsService, TestExecutionDetailsService } from './modules/details-service/test-execution-details.service';

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

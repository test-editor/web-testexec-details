import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestExecDetailsModule } from './modules/details/test-exec-details.module';
import { MessagingModule } from '@testeditor/messaging-service';
import { PropertiesViewModule } from './modules/properties/properties-view.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TestExecDetailsModule,
    MessagingModule.forRoot(),
    PropertiesViewModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

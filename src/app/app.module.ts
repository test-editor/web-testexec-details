import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestExecDetailsModule } from './modules/details/test-exec-details.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TestExecDetailsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

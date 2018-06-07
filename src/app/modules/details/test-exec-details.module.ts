import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestExecDetailsComponent } from './test-exec-details.component';
import { PropertiesViewModule } from '../properties/properties-view.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DefaultTestExecutionDetailsService, TestExecutionDetailsService } from '../details-service/test-execution-details.service';
import { HttpProviderService } from '../http-provider-service/http-provider.service';

@NgModule({
  imports: [
    CommonModule, PropertiesViewModule, TabsModule.forRoot()
  ],
  declarations: [
    TestExecDetailsComponent
  ],
  exports: [
    TestExecDetailsComponent
  ],
  providers: [
    HttpProviderService,
    {provide: TestExecutionDetailsService, useClass: DefaultTestExecutionDetailsService}
  ]
})
export class TestExecDetailsModule { }

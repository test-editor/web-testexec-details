import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestExecDetailsComponent } from './test-exec-details.component';
import { PropertiesViewModule } from '../properties/properties-view.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    CommonModule, PropertiesViewModule, TabsModule.forRoot()
  ],
  declarations: [
    TestExecDetailsComponent
  ],
  exports: [
    TestExecDetailsComponent
  ]
})
export class TestExecDetailsModule { }

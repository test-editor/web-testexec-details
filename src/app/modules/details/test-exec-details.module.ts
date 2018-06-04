import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestExecDetailsComponent } from './test-exec-details.component';
import { PropertiesViewModule } from '../properties/properties-view.module';

@NgModule({
  imports: [
    CommonModule, PropertiesViewModule
  ],
  declarations: [
    TestExecDetailsComponent
  ],
  exports: [
    TestExecDetailsComponent
  ]
})
export class TestExecDetailsModule { }

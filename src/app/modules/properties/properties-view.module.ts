import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesViewComponent } from './properties-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PropertiesViewComponent],
  exports: [PropertiesViewComponent]
})
export class PropertiesViewModule { }

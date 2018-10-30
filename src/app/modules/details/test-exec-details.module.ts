import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DefaultWindowService, WindowService } from '@testeditor/testeditor-commons';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TestExecutionDetailsServiceConfig } from '../details-service/test-execution-details-service-config';
import { DefaultTestExecutionDetailsService, TestExecutionDetailsService } from '../details-service/test-execution-details.service';
import { HttpProviderService } from '../http-provider-service/http-provider.service';
import { PropertiesViewModule } from '../properties/properties-view.module';
import { ResourceServiceConfig } from '../resource-service/resource-service-config';
import { DefaultResourceService, ResourceService } from '../resource-service/resource.service';
import { PropertiesPrettifierService,
  TestPropertiesPrettifierService } from '../test-properties-prettifier/test-properties-prettifier.service';
import { DefaultFileReaderProvider, FileReaderProvider, TestExecDetailsComponent } from './test-exec-details.component';

@NgModule({
  imports: [
    CommonModule, PropertiesViewModule, TabsModule.forRoot(), CarouselModule.forRoot(), FormsModule, ButtonsModule.forRoot()
  ],
  declarations: [
    TestExecDetailsComponent
  ],
  exports: [
    TestExecDetailsComponent
  ],
  providers: [
    HttpProviderService,
    {provide: TestExecutionDetailsService, useClass: DefaultTestExecutionDetailsService},
    {provide: ResourceService, useClass: DefaultResourceService},
    { provide: FileReaderProvider, useClass: DefaultFileReaderProvider },
    { provide: WindowService, useClass: DefaultWindowService },
    { provide: PropertiesPrettifierService, useClass: TestPropertiesPrettifierService }
  ]
})
export class TestExecDetailsModule {
  static forRoot(detailsServiceConfig: TestExecutionDetailsServiceConfig,
    resourceServiceConfig: ResourceServiceConfig): ModuleWithProviders {
    return {
      ngModule: TestExecDetailsModule,
      providers: [ { provide: TestExecutionDetailsServiceConfig, useValue: detailsServiceConfig },
                   { provide: ResourceServiceConfig, useValue: resourceServiceConfig } ]
    };
  }
}

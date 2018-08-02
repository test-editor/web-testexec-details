import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestExecDetailsComponent, FileReaderProvider, DefaultFileReaderProvider } from './test-exec-details.component';
import { PropertiesViewModule } from '../properties/properties-view.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DefaultTestExecutionDetailsService, TestExecutionDetailsService } from '../details-service/test-execution-details.service';
import { HttpProviderService } from '../http-provider-service/http-provider.service';
import { TestExecutionDetailsServiceConfig } from '../details-service/test-execution-details-service-config';
import { ResourceServiceConfig } from '../resource-service/resource-service-config';
import { ResourceService, DefaultResourceService } from '../resource-service/resource.service';
import { DefaultWindowService, WindowService } from '@testeditor/testeditor-commons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PropertiesPrettifierService } from '../test-properties-prettifier/test-properties-prettifier.service';
import { TestPropertiesPrettifierService } from '../test-properties-prettifier/test-properties-prettifier.service';

@NgModule({
  imports: [
    CommonModule, PropertiesViewModule, TabsModule.forRoot(), CarouselModule.forRoot()
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

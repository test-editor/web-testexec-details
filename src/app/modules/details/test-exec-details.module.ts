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
    {provide: TestExecutionDetailsService, useClass: DefaultTestExecutionDetailsService},
    {provide: ResourceService, useClass: DefaultResourceService},
    { provide: FileReaderProvider, useClass: DefaultFileReaderProvider },
    { provide: WindowService, useClass: DefaultWindowService }
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

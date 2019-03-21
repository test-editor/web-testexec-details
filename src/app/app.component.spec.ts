import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MessagingModule } from '@testeditor/messaging-service';
import { DefaultWindowService, WindowService } from '@testeditor/testeditor-commons';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { instance, mock } from 'ts-mockito/lib/ts-mockito';
import { AppComponent } from './app.component';
import { TestExecutionDetailsServiceConfig } from './modules/details-service/test-execution-details-service-config';
import { DefaultTestExecutionDetailsService, TestExecutionDetailsService } from './modules/details-service/test-execution-details.service';
import { DefaultFileReaderProvider, FileReaderProvider, TestExecDetailsComponent } from './modules/details/test-exec-details.component';
import { HttpProviderService } from '@testeditor/testeditor-commons';
import { PropertiesViewComponent } from './modules/properties/properties-view.component';
import { DefaultResourceService, ResourceService } from './modules/resource-service/resource.service';
import { PropertiesPrettifierService,
  TestPropertiesPrettifierService } from './modules/test-properties-prettifier/test-properties-prettifier.service';

describe('AppComponent', () => {
  const mockedResourceService = mock(DefaultResourceService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TestExecDetailsComponent,
        PropertiesViewComponent
      ],
      imports: [ TabsModule.forRoot(), MessagingModule.forRoot(), CarouselModule.forRoot(), FormsModule, ButtonsModule.forRoot() ],
      providers: [
        { provide: TestExecutionDetailsService, useClass: DefaultTestExecutionDetailsService },
        { provide: ResourceService, useValue: instance(mockedResourceService)},
        { provide: FileReaderProvider, useClass: DefaultFileReaderProvider},
        { provide: WindowService, useClass: DefaultWindowService },
        { provide: PropertiesPrettifierService, useClass: TestPropertiesPrettifierService },
        HttpProviderService,
        TestExecutionDetailsServiceConfig
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render sub-component', async(() => {
    // given
    const fixture = TestBed.createComponent(AppComponent);

    // when
    fixture.detectChanges();

    // then
    const nestedDetailsComponent = fixture.debugElement.query(By.css('app-test-exec-details'));
    expect(nestedDetailsComponent).not.toBeNull();
  }));
});

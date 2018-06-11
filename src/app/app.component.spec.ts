import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestExecDetailsComponent } from './modules/details/test-exec-details.component';
import { PropertiesViewComponent } from './modules/properties/properties-view.component';
import { By } from '@angular/platform-browser';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MessagingModule } from '@testeditor/messaging-service';
import { DefaultTestExecutionDetailsService, TestExecutionDetailsService } from './modules/details-service/test-execution-details.service';
import { HttpProviderService } from './modules/http-provider-service/http-provider.service';
import { TestExecutionDetailsServiceConfig } from './modules/details-service/test-execution-details-service-config';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TestExecDetailsComponent,
        PropertiesViewComponent
      ],
      imports: [ TabsModule.forRoot(), MessagingModule.forRoot() ],
      providers: [
        { provide: TestExecutionDetailsService, useClass: DefaultTestExecutionDetailsService },
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

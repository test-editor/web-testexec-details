import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExecDetailsComponent } from './test-exec-details.component';
import { PropertiesViewComponent } from '../properties/properties-view.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MessagingModule, MessagingService } from '@testeditor/messaging-service';
import { TEST_NAVIGATION_SELECT } from './event-types';
import { TestExecutionDetailsService, DefaultTestExecutionDetailsService } from '../test-execution-details/test-execution-details.service';
import { mock, instance, anything, verify, when } from 'ts-mockito';

describe('TestExecDetailsComponent', () => {
  let component: TestExecDetailsComponent;
  let fixture: ComponentFixture<TestExecDetailsComponent>;
  let messagingService: MessagingService;
  const mockedTestExecDetailsService = mock(DefaultTestExecutionDetailsService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestExecDetailsComponent, PropertiesViewComponent ],
      imports: [ MessagingModule.forRoot(), TabsModule.forRoot() ],
      providers: [
        { provide: TestExecutionDetailsService, useValue: instance(mockedTestExecDetailsService)}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExecDetailsComponent);
    messagingService = TestBed.get(MessagingService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates details on receiving TEST_NAVIGATION_SELECT event', () => {
    // given
    const selectionID = 4711;

    // when
    messagingService.publish(TEST_NAVIGATION_SELECT, selectionID);

    // then
    verify(mockedTestExecDetailsService.getTestExecutionDetails(selectionID, anything(), anything())).called();
  });
});

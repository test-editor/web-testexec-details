import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';

import { TestExecDetailsComponent } from './test-exec-details.component';
import { PropertiesViewComponent } from '../properties/properties-view.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MessagingModule, MessagingService } from '@testeditor/messaging-service';
import { TEST_NAVIGATION_SELECT } from '../event-types';
import { TestExecutionDetailsService, DefaultTestExecutionDetailsService } from '../details-service/test-execution-details.service';
import { TestRunID, TestExecutionDetails, DataKind } from '../details-service/test-execution-details.service';
import { mock, instance, anything, verify, when } from 'ts-mockito';
import { By } from '@angular/platform-browser';

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

  function setMockServiceResponse(id: TestRunID, details: TestExecutionDetails[]): void {
    when(mockedTestExecDetailsService.getTestExecutionDetails(id ? id : anything()))
      .thenReturn(Promise.resolve(details));
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates details on receiving TEST_NAVIGATION_SELECT event', () => {
    // given
    const selectionID: TestRunID = {testSuiteID: 42, testSuiteRunID: 1, testRunID: 2, treeID: 23};

    // when
    messagingService.publish(TEST_NAVIGATION_SELECT, selectionID);

    // then
    verify(mockedTestExecDetailsService.getTestExecutionDetails(selectionID)).called();
  });

  it('resets details on receiving TEST_NAVIGATION_SELECT event when the payload is "null"', fakeAsync(() => {
    // given
    const selectionID: TestRunID = {testSuiteID: 42, testSuiteRunID: 1, testRunID: 2, treeID: 23};
    setMockServiceResponse(selectionID, null);
    console.log = jasmine.createSpy('log');

    // when
    try {
      messagingService.publish(TEST_NAVIGATION_SELECT, selectionID);
      flush();
      fixture.detectChanges();
      flush();

    // then
    } catch (error) {
      fail(error);
    }

    expect(console.log).toHaveBeenCalledWith('warning: received empty details data');

    const image = fixture.debugElement.query(By.css('img'));
    expect(image.properties.src).toEqual('');

    const definitionList = fixture.debugElement.query(By.css('dl'));
    expect(definitionList).toBeFalsy();

    const textArea = fixture.debugElement.query(By.css('textarea'));
    expect(textArea.nativeElement.innerHTML).toEqual('');
  }));

  it('fills test step details tab when retrieved details contain data of type "properties"', fakeAsync(() => {
    // given
    const selectionID: TestRunID = {testSuiteID: 42, testSuiteRunID: 1, testRunID: 2, treeID: 23};
    setMockServiceResponse(selectionID, [{
      type: DataKind.properties,
      content: {
        'Execution Time': '3.14159 seconds',
        'Status': 'OK'
      }}]);

    // when
    messagingService.publish(TEST_NAVIGATION_SELECT, selectionID);
    tick();
    fixture.detectChanges();

    // then
    const definitionList = fixture.debugElement.query(By.css('dl'));
    expect(definitionList.nativeElement).toBeTruthy();
    expect(definitionList.children.length).toEqual(2);
    expect(definitionList.children[0].children[0].nativeElement.innerText).toEqual('Execution Time');
    expect(definitionList.children[0].children[1].nativeElement.innerText).toEqual('3.14159 seconds');
    expect(definitionList.children[1].children[0].nativeElement.innerText).toEqual('Status');
    expect(definitionList.children[1].children[1].nativeElement.innerText).toEqual('OK');
  }));

  it('sets image url in screenshot tab when retrieved details contain data of type "image"', fakeAsync(() => {
    // given
    const imageURL = 'http://testeditor.org/wp-content/uploads/2014/04/LogoTesteditor-e1403289032145.png';
    const selectionID: TestRunID = {testSuiteID: 42, testSuiteRunID: 1, testRunID: 2, treeID: 23};
    setMockServiceResponse(selectionID, [{
      type: DataKind.image,
      content: imageURL}]);

    // when
    messagingService.publish(TEST_NAVIGATION_SELECT, selectionID);
    tick();
    fixture.detectChanges();

    // then
    const image = fixture.debugElement.query(By.css('img'));
    expect(image.nativeElement.src).toEqual(imageURL);
  }));

  it('displays log lines in the raw log tab when retrieved details contain data of type "text"', fakeAsync(() => {
    // given
    const sampleLog =
    `INFO: This is a log entry!
DEBUG: Another log entry.`;

    const selectionID: TestRunID = {testSuiteID: 42, testSuiteRunID: 1, testRunID: 2, treeID: 23};
    setMockServiceResponse(selectionID, [{
      type: DataKind.text,
      content: sampleLog}]);

    // when
    messagingService.publish(TEST_NAVIGATION_SELECT, selectionID);
    tick();
    fixture.detectChanges();

    // then
    const textArea = fixture.debugElement.query(By.css('textarea'));
    expect(textArea.nativeElement.innerHTML).toEqual(sampleLog);
  }));

  it('fills all tabs with retrieved details data', fakeAsync(() => {
    // given
    const sampleLog =
    `INFO: This is a log entry!
DEBUG: Another log entry.`;
    const imageURL = 'http://testeditor.org/wp-content/uploads/2014/04/LogoTesteditor-e1403289032145.png';

    const selectionID: TestRunID = {testSuiteID: 42, testSuiteRunID: 1, testRunID: 2, treeID: 23};
    setMockServiceResponse(selectionID, [{
      type: DataKind.text,
      content: 'this will be ignored / overwritten!'
    }, {
      type: DataKind.text,
      content: sampleLog
    }, {
      type: DataKind.properties,
      content: {
        'Status': 'OK'
    }}, {
      type: DataKind.image,
      content: imageURL
    }]);

    // when
    messagingService.publish(TEST_NAVIGATION_SELECT, selectionID);
    tick();
    fixture.detectChanges();

    // then
    const textArea = fixture.debugElement.query(By.css('textarea'));
    expect(textArea.nativeElement.innerHTML).toEqual(sampleLog);

    const image = fixture.debugElement.query(By.css('img'));
    expect(image.nativeElement.src).toEqual(imageURL);

    const definitionList = fixture.debugElement.query(By.css('dl'));
    expect(definitionList.children[0].children[0].nativeElement.innerText).toEqual('Status');
    expect(definitionList.children[0].children[1].nativeElement.innerText).toEqual('OK');
  }));

  it('escapes text inserted into the DOM', fakeAsync(() => {
    // given
    const sampleLog =
    `log entry</textarea><div id="BAD"><p>NOT ALLOWED</p></div>`;

    const selectionID: TestRunID = {testSuiteID: 42, testSuiteRunID: 1, testRunID: 2, treeID: 23};
    setMockServiceResponse(selectionID, [{
      type: DataKind.text,
      content: sampleLog}]);

    // when
    messagingService.publish(TEST_NAVIGATION_SELECT, selectionID);
    tick();
    fixture.detectChanges();

    // then
    const textArea = fixture.debugElement.query(By.css('textarea'));
    expect(textArea.nativeElement.innerHTML).toEqual(
      'log entry&lt;/textarea&gt;&lt;div id="BAD"&gt;&lt;p&gt;NOT ALLOWED&lt;/p&gt;&lt;/div&gt;');
    const illegalElement = fixture.debugElement.query(By.css('#BAD'));
    expect(illegalElement).toBeFalsy();
  }));

});

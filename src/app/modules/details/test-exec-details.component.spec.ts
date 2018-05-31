import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExecDetailsComponent } from './test-exec-details.component';

describe('TestExecDetailsComponent', () => {
  let component: TestExecDetailsComponent;
  let fixture: ComponentFixture<TestExecDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestExecDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExecDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExecDetailsComponent } from './test-exec-details.component';
import { PropertiesViewComponent } from '../properties/properties-view.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

describe('TestExecDetailsComponent', () => {
  let component: TestExecDetailsComponent;
  let fixture: ComponentFixture<TestExecDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestExecDetailsComponent, PropertiesViewComponent ],
      imports: [ TabsModule.forRoot() ]
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

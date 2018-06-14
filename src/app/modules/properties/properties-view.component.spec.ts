import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { PropertiesViewComponent } from './properties-view.component';
import { By } from '@angular/platform-browser';

describe('PropertiesViewComponent', () => {
  let component: PropertiesViewComponent;
  let fixture: ComponentFixture<PropertiesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display simple object properties', () => {
    // given
    const objectToBeDisplayed = {
      'Text Property': 'some information',
      'Number Property': '3.14159',
      'This is empty': '',
    };

    // when
    component.model = objectToBeDisplayed;
    fixture.detectChanges();

    // then
    const definitionList = fixture.debugElement.query(By.css('dl'));
    expect(definitionList.nativeElement).toBeTruthy();
    expect(definitionList.children.length).toEqual(3);
    expect(definitionList.children[0].children[0].nativeElement.innerText).toEqual('Text Property');
    expect(definitionList.children[0].children[1].nativeElement.innerText.trim()).toEqual('some information');
    expect(definitionList.children[1].children[0].nativeElement.innerText).toEqual('Number Property');
    expect(definitionList.children[1].children[1].nativeElement.innerText.trim()).toEqual('3.14159');
    expect(definitionList.children[2].children[0].nativeElement.innerText).toEqual('This is empty');
    expect(definitionList.children[2].children[1].nativeElement.innerText.length).toBeGreaterThan(0);
  });

  it('should display complex object properties in JSON format', () => {
    // given
    const objectToBeDisplayed = {
      'Course Information': {
        'Description': 'How to defend yourself against different kinds of fruit',
        'Fruits': ['Banana', 'Apple', 'Orange', 'Pomegranate' ],
        'Lesson': 1,
        'Object': {
          'Nested Field': 'Lorem ipsum dolor sit amet'
        }
      }
    };

    // when
    component.model = objectToBeDisplayed;
    fixture.detectChanges();

    // then
    const definitionList = fixture.debugElement.query(By.css('dl'));
    expect(definitionList.nativeElement).toBeTruthy();
    expect(definitionList.children.length).toEqual(1);
    expect(definitionList.children[0].children[0].nativeElement.innerText).toEqual('Course Information');
    expect(definitionList.children[0].children[1].nativeElement.innerText.trim()).toEqual(`{
  "Description": "How to defend yourself against different kinds of fruit",
  "Fruits": [
    "Banana",
    "Apple",
    "Orange",
    "Pomegranate"
  ],
  "Lesson": 1,
  "Object": {
    "Nested Field": "Lorem ipsum dolor sit amet"
  }
}`);
  });

  it('should not display a list if model is undefined', () => {
    // given
    const objectToBeDisplayed = undefined;

    // when
    component.model = objectToBeDisplayed;
    fixture.detectChanges();

    // then
    const definitionList = fixture.debugElement.query(By.css('dl'));
    expect(definitionList).toBeNull();
  });

  it('should not display a list if model has no properties', () => {
    // given
    const objectToBeDisplayed = {};

    // when
    component.model = objectToBeDisplayed;
    fixture.detectChanges();

    // then
    const definitionList = fixture.debugElement.query(By.css('dl'));
    expect(definitionList).toBeNull();
  });

  // given
  [ [-3.14159, 'number'],
    [[1, 2, 3], 'array'],
    ['Hello World', 'string'],
    [true, 'boolean'],
    [() => 'This is a function!', 'function']
  ].forEach(([invalidValue, typeName]) =>
  it(`should display an error instead of a list if model is not an object (model=${invalidValue})`, () => {

    // when
    component.model = invalidValue;
    fixture.detectChanges();

    // then
    const definitionList = fixture.debugElement.query(By.css('dl'));
    expect(definitionList).toBeNull();
    const errorMessage = fixture.debugElement.query(By.css('p'));
    expect(errorMessage.nativeElement.innerText).toEqual(`Cannot display data of unexpected type: ${typeName}`);
  }));

});

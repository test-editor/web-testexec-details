import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-properties-view',
  templateUrl: './properties-view.component.html',
  styleUrls: ['./properties-view.component.css']
})
export class PropertiesViewComponent implements OnInit {

  @Input() model: any;

  constructor() { }

  ngOnInit() {
  }

  private propertyValue = (propertyName: string) => {
    let result = this.model[propertyName];
    const type = this.typeOf(result);
    console.log(`type of ${propertyName} is ${type}`);
    if (type === typeof {} || type === 'array') {
      result = JSON.stringify(this.model[propertyName], null, 2);
    }
    return result;
  }
  private typeOf = (element: any) => Array.isArray(element) ? 'array' : typeof element;

  private propertyNames(): string[] {
    if (this.isModelValid()) {
      return Object.keys(this.model);
    } else {
      return [];
    }
  }

  private isModelValid(): boolean {
    return this.model === Object(this.model) && !Array.isArray(this.model) && typeof this.model !== 'function';
  }
}

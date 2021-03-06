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

  propertyValue = (propertyName: string) => {
    let result = this.model[propertyName];
    const type = this.typeOf(result);
    if (type === typeof {} || type === 'array') {
      result = JSON.stringify(this.model[propertyName], null, 2);
    }
    return result;
  }

  typeOf = (element: any) => Array.isArray(element) ? 'array' : typeof element;

  propertyNames(): string[] {
    if (this.isModelValid()) {
      return Object.keys(this.model);
    } else {
      return [];
    }
  }

  public isModelValid(): boolean {
    return this.model === Object(this.model) && !Array.isArray(this.model) && typeof this.model !== 'function';
  }
}

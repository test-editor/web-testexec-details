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

  private propertyValue = (propertyName: string) => this.model[propertyName];
  private typeOfModel = () => Array.isArray(this.model) ? 'array' : typeof this.model;

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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-exec-details',
  templateUrl: './test-exec-details.component.html',
  styleUrls: ['./test-exec-details.component.css']
})
export class TestExecDetailsComponent implements OnInit {

// random, temporary data for demonstration purposes
private readonly properties = {
  'Type': 'Test Step',
  'Execution Time': '4.2 seconds',
  'Status': 'OK'
};

  constructor() { }

  ngOnInit() {
  }

}

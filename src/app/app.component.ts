import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessagingService } from '@testeditor/messaging-service';
import { TEST_NAVIGATION_SELECT } from './modules/event-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private messagingService: MessagingService) {}

  ngAfterViewInit(): void {
    this.messagingService.publish(TEST_NAVIGATION_SELECT, '');
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagingService } from '@testeditor/messaging-service';
import { ISubscription, Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { TEST_NAVIGATION_SELECT } from '../event-types';
import { TestExecutionDetailsService, TestRunID, TestExecutionDetails, DataKind } from '../details-service/test-execution-details.service';

@Component({
  selector: 'app-test-exec-details',
  templateUrl: './test-exec-details.component.html',
  styleUrls: ['./test-exec-details.component.css']
})
export class TestExecDetailsComponent implements OnInit, OnDestroy {

  private properties: any = {};
  private screenshotURL = '';
  private rawLog = '';

  private subscription: Subscription;

  constructor(private messagingService: MessagingService, private detailsService: TestExecutionDetailsService) { }

  ngOnInit() {
    this.subscription = this.messagingService.subscribe(TEST_NAVIGATION_SELECT, (id) => this.updateDetails(id));
    // use this.subscription.add(…) to add additional subscriptions;
    // that way, all subscriptions will be cancelled when this component is destroyed.
    // See http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async updateDetails(id: TestRunID) {
    const details = await this.detailsService.getTestExecutionDetails(id);
    if (details) {
      details.forEach((entry) => {
        switch (entry.type) {
          case DataKind.image: this.screenshotURL = entry.content; break;
          case DataKind.properties: this.properties = entry.content; break;
          case DataKind.text: this.rawLog = entry.content; break;
        }
      });
    } else {
      console.log('warning: received empty details data');
      this.screenshotURL = '';
      this.properties = {};
      this.rawLog = '';
    }
  }

}

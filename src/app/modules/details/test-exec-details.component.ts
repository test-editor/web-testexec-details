import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagingService } from '@testeditor/messaging-service';
import { ISubscription, Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { TEST_NAVIGATION_SELECT } from '../event-types';
import { TestExecutionDetailsService, DataKind } from '../details-service/test-execution-details.service';
import { TestRunId } from './test-run-id';
import { ResourceService } from '../resource-service/resource.service';
import { resource } from 'selenium-webdriver/http';


export abstract class FileReaderProvider {
  abstract get(): {
    onload: ((this: FileReader, ev: FileReaderProgressEvent) => any) | null,
    result: any,
    readAsDataURL(blob: Blob): void};
}

export class DefaultFileReaderProvider extends FileReaderProvider {
  get(): FileReader {
    return new FileReader();
  }
}

@Component({
  selector: 'app-test-exec-details',
  templateUrl: './test-exec-details.component.html',
  styleUrls: ['./test-exec-details.component.css']
})
export class TestExecDetailsComponent implements OnInit, OnDestroy {

  private properties: any = {};
  private rawLog = '';
  private encodedScreenshot = '';
  private isImageLoading = true;

  private subscription: Subscription;

  private getScreenshot(path: string) {
      this.isImageLoading = true;
      this.resourceService.getBinaryResource(path).then((screenshot: Blob) => {
        console.log(`retrieved screenshot ${screenshot}`);
        this.createImageFromBlob(screenshot);
        this.isImageLoading = false;
      }, error => {
        console.log(error);
        this.isImageLoading = false;
      });
  }

  constructor(private messagingService: MessagingService,
    private detailsService: TestExecutionDetailsService,
    private resourceService: ResourceService,
    private fileReaderProvider: FileReaderProvider) {}

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

  async updateDetails(id: string) {
    this.encodedScreenshot = '';
    this.properties = {};
    this.rawLog = '';
    const details = await this.detailsService.getTestExecutionDetails(id);
    if (details) {
      details.forEach((entry) => {
        switch (entry.type) {
          case DataKind.image: this.getScreenshot(entry.content); break;
          case DataKind.properties: this.properties = entry.content; break;
          case DataKind.text: this.rawLog = entry.content; break;
        }
      });
    } else {
      console.log('warning: received empty details data');
    }
  }

  private createImageFromBlob(image: Blob) {
    const reader = this.fileReaderProvider.get();
    reader.onload = () => {
       this.encodedScreenshot = reader.result;
       console.log('screenshot was set');
    };

    if (image) {
       reader.readAsDataURL(image);
    }
}

}

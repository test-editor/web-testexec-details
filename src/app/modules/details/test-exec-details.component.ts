import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessagingService } from '@testeditor/messaging-service';
import { WindowService } from '@testeditor/testeditor-commons';
import { Subscription } from 'rxjs/Subscription';
import { DataKind, LogLevel, TestExecutionDetailsService } from '../details-service/test-execution-details.service';
import { TEST_NAVIGATION_SELECT } from '../event-types';
import { ResourceService } from '../resource-service/resource.service';
import { PropertiesPrettifierService } from '../test-properties-prettifier/test-properties-prettifier.service';

export interface FileReaderLike {
  onload: ((this: FileReaderLike | FileReader, ev?: FileReaderProgressEvent) => any) | null;
  result: any;
  readAsDataURL(blob: Blob): void;
}

export abstract class FileReaderProvider {
  abstract get(): FileReaderLike;
}

export class DefaultFileReaderProvider extends FileReaderProvider {
  get(): FileReader {
    return new FileReader();
  }
}

type SelectableLogLevel = LogLevel.INFO | LogLevel.DEBUG | LogLevel.TRACE;

@Component({
  selector: 'app-test-exec-details',
  templateUrl: './test-exec-details.component.html',
  styleUrls: ['./test-exec-details.component.css']
})
export class TestExecDetailsComponent implements OnInit, OnDestroy {
  private encodedScreenshots = new Array(0);
  private imagesRemainingToLoad = 0;
  private subscription: Subscription;
  private currentId: string;
  private logLevel_: SelectableLogLevel = LogLevel.INFO;

  public properties: any = {};
  public rawLog = '';
  public showImages = false;

  constructor(private messagingService: MessagingService,
    private detailsService: TestExecutionDetailsService,
    private resourceService: ResourceService,
    private fileReaderProvider: FileReaderProvider,
    private windowReference: WindowService,
    private propertiesPrettifier: PropertiesPrettifierService<object>) { }

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

  get logLevel(): SelectableLogLevel {
    return this.logLevel_;
  }

  set logLevel(logLevel: SelectableLogLevel) {
    if (this.logLevel_ !== logLevel) {
      const previousLogLevel = this.logLevel_;
      this.logLevel_ = logLevel;
      this.retrieveLog(previousLogLevel);
    }
  }

  private async retrieveLog(previousLogLevel: SelectableLogLevel) {
    if (this.currentId) {
      const details = await this.detailsService.getTestExecutionLog(this.currentId, this.logLevel_);
      if (details) {
        this.updateLog(details.filter((entry) => entry.type === DataKind.text).pop().content);
      } else {
        console.log('warning: received empty details data');
        this.logLevel_ = previousLogLevel;
      }
    }
  }

  // Needed to iterate the screenshots in proper order from within this component's template.
  // The screenshots are retrieved from the server asynchronously and stored in an array, so
  // the order of retrieval is not guaranteed to be the same as the original order as given
  // by the associated index.
  get screenshotIndices() {
    return Array.from(Array(this.encodedScreenshots.length).keys());
  }

  onScreenshotClick(index: number): void {
    this.windowReference.open(() => Promise.resolve(new URL(this.encodedScreenshots[index])));
  }

  async updateDetails(id: string): Promise<void> {
    this.currentId = undefined;
    this.showImages = false;
    this.encodedScreenshots = new Array();
    this.properties = {};
    this.rawLog = '';
    const details = await this.detailsService.getTestExecutionDetails(id, this.logLevel_);
    this.currentId = id;
    if (details) {
      const screenshotPaths: string[] = [];
      details.forEach((entry) => {
        switch (entry.type) {
          case DataKind.image: screenshotPaths.push(entry.content); break;
          case DataKind.properties: this.properties = this.propertiesPrettifier.prettify(entry.content); break;
          case DataKind.text: this.updateLog(entry.content); break;
        }
      });
      this.imagesRemainingToLoad = screenshotPaths.length;
      screenshotPaths.forEach((path, index) => this.getScreenshot(path, index));
    } else {
      console.log('warning: received empty details data');
    }
  }

  private updateLog(log: any) {
    this.rawLog = Array.isArray(log) ? log.join('\n') : log;
  }

  private getScreenshot(path: string, index: number) {
    this.showImages = false;
    this.resourceService.getBinaryResource(path).then((screenshot: Blob) => {
      console.log(`retrieved screenshot ${screenshot}`);
      this.createImageFromBlob(screenshot, index);
    }, error => {
      console.log(error);
      this.showImages = false;
    });
  }

  private createImageFromBlob(image: Blob, index: number) {
    const reader = this.fileReaderProvider.get();
    reader.onload = () => {
      this.encodedScreenshots[index] = reader.result;
      this.imagesRemainingToLoad--;
      if (this.imagesRemainingToLoad <= 0) {
        this.showImages = true;
      }
    };

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessagingService } from '@testeditor/messaging-service';
import { WindowService } from '@testeditor/testeditor-commons';
import { Subscription } from 'rxjs';
import { DataKind, LogLevel, TestExecutionDetailsService } from '../details-service/test-execution-details.service';
import { TEST_EXECUTION_TREE_LOADED, TEST_NAVIGATION_SELECT } from '../event-types';
import { ResourceService } from '../resource-service/resource.service';
import { PropertiesOrganizerService } from '../test-properties-organizer/test-properties-organizer.service';
import { PropertiesPrettifierService } from '../test-properties-prettifier/test-properties-prettifier.service';

export interface FileReaderLike {
  onload: ((this: FileReaderLike | FileReader, ev?: ProgressEvent) => any) | null;
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

export type SelectableLogLevel = LogLevel.INFO | LogLevel.DEBUG | LogLevel.TRACE;

@Component({
  selector: 'app-test-exec-details',
  templateUrl: './test-exec-details.component.html',
  styleUrls: ['./test-exec-details.component.css']
})
export class TestExecDetailsComponent implements OnInit, OnDestroy {
  private imagesRemainingToLoad = 0;
  private subscription: Subscription;
  private currentId_: string;
  private logLevel_: SelectableLogLevel = LogLevel.INFO;

  public encodedScreenshots = new Array(0);
  public properties: any = {};
  public rawLog = '';
  public showImages = false;

  constructor(private messagingService: MessagingService,
    private detailsService: TestExecutionDetailsService,
    private resourceService: ResourceService,
    private fileReaderProvider: FileReaderProvider,
    private windowReference: WindowService,
    private propertiesPrettifier: PropertiesPrettifierService<object>,
    private propertiesOrganizer: PropertiesOrganizerService) { }

  ngOnInit() {
    this.subscription = this.messagingService.subscribe(TEST_NAVIGATION_SELECT, (id) => this.updateDetails(id));
    this.subscription.add(
      this.messagingService.subscribe(TEST_EXECUTION_TREE_LOADED, () => { this.clearDetails(); })
    );
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
      this.logLevel_ = logLevel;
      this.retrieveLog();
    }
  }

  get currentId() {
    return this.currentId_;
  }

  private async retrieveLog() {
    if (this.currentId_) {
      const idForRequest = this.currentId_;
      const levelForRequest = this.logLevel_;
      try {
        const details = await this.detailsService.getTestExecutionLog(idForRequest, levelForRequest);
        if (details) {
          this.updateLog(details.filter((entry) => entry.type === DataKind.text).pop().content);
        } else {
          console.log('warning: received empty details data');
        }
      } catch (error) {
        console.error(`problem while trying to retrieve log for test step id "${idForRequest}" on level "${levelForRequest}`, error);
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

  private nodeWasExecuted(id: string): boolean {
    if (id) {
      return id.split('/').length > 1;
    } else {
      return false;
    }
  }

  async updateDetails(id: string): Promise<void> {
    this.clearDetails();
    if (this.nodeWasExecuted(id)) {
      const details = await this.detailsService.getTestExecutionDetails(id, this.logLevel_);
      this.currentId_ = id;
      if (details) {
        const screenshotPaths: string[] = [];
        details.forEach((entry) => {
          switch (entry.type) {
            case DataKind.image: screenshotPaths.push(entry.content); break;
            case DataKind.properties: this.properties =
              this.propertiesOrganizer.organize(
                this.propertiesPrettifier.prettify(entry.content)
              ); break;
            case DataKind.text: this.updateLog(entry.content); break;
          }
        });
        this.imagesRemainingToLoad = screenshotPaths.length;
        screenshotPaths.forEach((path, index) => this.getScreenshot(path, index));
      } else {
        console.log('warning: received empty details data');
      }
    }
  }

  private clearDetails() {
    this.currentId_ = undefined;
    this.showImages = false;
    this.encodedScreenshots = new Array();
    this.properties = {};
    this.rawLog = '';
  }

  private updateLog(log: any) {
    if (!Array.isArray(log)) {
      this.rawLog = log;
    } else {
      if (this.logLevel === LogLevel.INFO) {
        this.rawLog = log.map(
          (line: string) => line.replace(new RegExp('(\\[[^\\]]+\\] +)+DefaultLoggingListener '), '')
        ).join('\n');
      } else {
        this.rawLog = log.join('\n');
      }
    }
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

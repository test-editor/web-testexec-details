import { browser, by, element, } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/').then(() => browser.getPageSource().then((pageSource: string) => console.log(pageSource)));
  }

  getPropertyName(index: number) {
    return element(by.xpath(`(//dl/div/dt)[${index}]`)).getText();
  }

  getPropertyValue(index: number) {
    return element(by.xpath(`(//dl/div/dd)[${index}]`)).getText().then((text) => text.trim());
  }
}

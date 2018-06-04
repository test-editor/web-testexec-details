import { AppPage } from './app.po';

describe('testexec-details App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getPropertyName(1)).toEqual('Type');
    expect(page.getPropertyName(2)).toEqual('Execution Time');
    expect(page.getPropertyName(3)).toEqual('Status');
    expect(page.getPropertyValue(1)).toEqual('Test Step');
    expect(page.getPropertyValue(2)).toEqual('4.2 seconds');
    expect(page.getPropertyValue(3)).toEqual('OK');
  });
});

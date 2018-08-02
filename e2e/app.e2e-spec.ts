import { AppPage } from './app.po';

describe('testexec-details App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.findElementContainingText('Type')).toBeTruthy();
    expect(page.findElementContainingText('ID')).toBeTruthy();
    expect(page.findElementContainingText('Duration')).toBeTruthy();
    expect(page.findElementContainingText('Test Step')).toBeTruthy();
    expect(page.findElementContainingText('15 h 23 min 42.333 s')).toBeTruthy();
    expect(page.findElementContainingText('OK')).toBeTruthy();
  });
});

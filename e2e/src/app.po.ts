import { browser, by, element } from 'protractor';

export class AppPage {
  public async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  public async getText(): Promise<string> {
    return element(by.css('app-root')).getText();
  }
}

import { Builder } from 'selenium-webdriver';
import { expect } from 'chai';

const browsers = ['chrome', 'firefox'];

describe('Cross-browser testing with Selenium Grid', function () {
  this.timeout(60000);

  browsers.forEach((browserName) => {
    it(`should load the page and check the title on ${browserName}`, async function () {
      const driver = await new Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .forBrowser(browserName)
        .build();

      try {
        await driver.get('https://learn.ztu.edu.ua/');
        const title = await driver.getTitle();
        expect(title).to.equal('На головну | Освітній портал')
      } finally {
        await driver.quit();
      }
    });
  });
});

import { Builder } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Check Page Title', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('should verify the page title', async function () {
    await driver.get('https://learn.ztu.edu.ua/');
    const title = await driver.getTitle();
    expect(title).to.equal('На головну | Освітній портал')
  });

  after(async function () {
    await driver.quit();
  });
});

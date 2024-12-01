import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Link Navigation', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('should navigate through links and verify URL', async function () {
    await driver.get('https://learn.ztu.edu.ua/');
    const link = await driver.findElement(By.css('a[href="https://learn.ztu.edu.ua/login/index.php"]'));
    const expectedUrl = await link.getAttribute('href');
    await link.click();
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(expectedUrl);
  });

  after(async function () {
    await driver.quit();
  });
});

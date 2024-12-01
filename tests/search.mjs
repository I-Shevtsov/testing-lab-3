import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Search Functionality', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('should search and verify results', async function () {
    await driver.get('https://learn.ztu.edu.ua/');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Тестування, верифікація та валідація ПЗ');
    await searchBox.submit();

    const title = await driver.getTitle();
    expect(title).to.include('Результати пошуку | Освітній портал');

    const course = await driver.findElement(By.className('coursebox'));
    const courseText = await course.getText();
    expect(courseText).to.include('Тестування, верифікація та валідація ПЗ');
  });

  after(async function () {
    await driver.quit();
  });
});

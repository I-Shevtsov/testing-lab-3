import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFilePath = path.resolve(__dirname, '../data/login.csv');

async function loadTestData(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        if (data.length === 0) {
          reject(new Error('Test data is empty. Please check the CSV file.'));
        } else {
          resolve(data);
        }
      })
      .on('error', reject);
  });
}
const testData = await loadTestData(csvFilePath);

describe('Data-Driven Testing', function () {
  this.timeout(60000);

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  testData.forEach(({ username, password, expectedResult }) => {
    it(`should validate login for ${username} with expected result: ${expectedResult}`, async function () {
      console.log(`Running test for: ${username}, expected result: ${expectedResult}`);

      await driver.get('http://localhost:3000/login-form');

      const usernameField = await driver.findElement(By.name('username'));
      await usernameField.sendKeys(username);

      const passwordField = await driver.findElement(By.name('password'));
      await passwordField.sendKeys(password);

      const loginButton = await driver.findElement(By.css('button[type="submit"]'));
      await loginButton.click();

      const result = await driver.findElement(By.id('result')).getText();
      expect(result).to.equal(expectedResult);
    });
  });
});

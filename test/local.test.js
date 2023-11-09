const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');

const getElementById = async (driver, id, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByName = async (driver, name, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByXpath = async (driver, xpath, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

describe('webdriver', () => {
  let driver;

  beforeAll(async () => {
    driver = new webdriver.Builder().forBrowser('chrome').build();

    // eslint-disable-next-line no-undef
    await driver.get(`https://lambdatest.github.io/sample-todo-app/`);
  }, 10000);

  afterAll(async () => {
    await driver.quit();
  }, 15000);

  test('test', async () => {
    const lnk = await getElementByName(driver, 'li1');
    await lnk.click();

    const lnk1 = await getElementByName(driver, 'li2');
    await lnk1.click();

    const inpf = await getElementById(driver, 'sampletodotext');
    await inpf.clear();
    await inpf.sendKeys("Yey, Let's add it to list");

    const btn = await getElementById(driver, 'addbutton');
    await btn.click();

    const output = await getElementByXpath(
      driver, "//input[@name='li6']/following-sibling::span");
    const outputVal = await output.getText();
    expect(outputVal).toEqual("Yey, Let's add it to list");
  }, 10000);
});

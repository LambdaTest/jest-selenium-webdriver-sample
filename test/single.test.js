const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const LambdaTestRestClient = require('@lambdatest/node-rest-client');

const username = process.env.LT_USERNAME || '<your username>';
const accessKey = process.env.LT_ACCESS_KEY || '<your accessKey>';

const AutomationClient = LambdaTestRestClient.AutomationClient({
  username,
  accessKey
});
const capabilities = {
  build: 'jest-LambdaTest-Single',
  browserName: 'chrome',
  version: 'latest',
  platform: 'Windows 10',
<<<<<<< HEAD
=======

>>>>>>> 425388b52f57c123515421df7b4c48e3103e3390
};

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

let sessionId = null;

describe('webdriver', () => {
  let driver;
  beforeAll(async () => {
    driver = new webdriver.Builder()
      .usingServer(
        'https://' + username + ':' + accessKey + '@hub.lambdatest.com/wd/hub'
      )
      .withCapabilities(capabilities)
      .build();
    await driver.getSession().then(function(session) {
      sessionId = session.id_;
    });
    // eslint-disable-next-line no-undef
    await driver.get(`https://lambdatest.github.io/sample-todo-app/`);
  }, 30000);

  afterAll(async () => {
    await driver.quit();
  }, 40000);

  test('test', async () => {
    try {
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
        driver,
        '//html/body/div/div/div/ul/li[6]/span'
      );
      const outputVal = await output.getText();
      expect(outputVal).toEqual("Yey, Let's add it to list");
      await updateJob(sessionId, 'passed');
    } catch (err) {
      await webdriverErrorHandler(err, driver);
      throw err;
    }
  }, 35000);
});

async function webdriverErrorHandler(err, driver) {
  console.error('Unhandled exception! ' + err.message);
  if (driver && sessionId) {
    try {
      await driver.quit();
    } catch (_) {}
    await updateJob(sessionId, 'failed');
  }
}
function updateJob(sessionId, status) {
  return new Promise((resolve, reject) => {
    AutomationClient.updateSessionById(
      sessionId,
      { status_ind: status },
      err => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

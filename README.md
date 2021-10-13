![LambdaTest Logo](https://www.lambdatest.com/static/images/logo.svg)
---
# Jest Tutorial For Selenium Test Automation

![Jest Tutorial](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/Jest-Tutorial.jpg)

Jest is  an open source javascript testing framework developed by Facebook.Jest has exceptional  benefits of  easy set up, super fast execution,and provides an excellent combination of a test runner & an assertion library. 

This tutorial will help you run Jest automation scripts over LambdaTest Selenium Grid.
## Prerequisites for Jest tutorial

**1.** Download an IDE. You can use **[Visual Studio IDE](https://code.visualstudio.com/download)** for your operating system.

**2. Node.js and Package Manager (npm)** : Install Node.js from their [official website](https://nodejs.org/en/download/) Or Install Node.js using command line. Go to the terminal or command prompt & run the below command.
```
$ install node
```
* If you already have Node.js installed then check the version using the command:
```
$ node -v
```
* If node isn’t of the latest version then you can update it using the below command.
```
$ npm install npm@latest -g
```
**3.** Next, you need to **install Jest**. Run the below command to install Jest:
```
$ npm install --save-dev jest --force
```
**4. LambdaTest Authentication Credentials**: Make sure you have your LambdaTest credentials with you to run test automation scripts with Jest on LambdaTest Selenium Grid. You can obtain these credentials from the [LambdaTest Automation Dashboard](https://automation.lambdatest.com/) or through [LambdaTest Profile](https://accounts.lambdatest.com/detail/profile).

Set **LambdaTest Username** and **Access Key** in environment variables.

  - For linux/mac
    ```
    export LT_USERNAME="YOUR_USERNAME"
    export LT_ACCESS_KEY="YOUR ACCESS KEY"
    ```
  - For Windows
    ```
    set LT_USERNAME="YOUR_USERNAME"
    set LT_ACCESS_KEY="YOUR ACCESS KEY"
    ```
## Setting Up The Project For Selenium Jest Tutorial In IDE

**Step 1** : After installation of the Visual Studio IDE, create a folder in your local system to save all the projects.

**Step 2** : Install the below extensions for JavaScript from ‘Extensions’ in VScode Editor.
         * Code Runner
         * JavaScript( ES6) code snippet
         * ES Lint

**Step 3**: Press ‘Ctrl+Shift+P’ and search for git:clone. Paste the URL of this repository(https://github.com/LambdaTest/jest-selenium-webdriver-sample.git) to clone.

**Step 4**: Press ENTER and save Jest project  in the above created folder.

**Step 5**: Open project directory **jest-selenium-webdriver-sample** in VScode.

**Step 6**: Create a project directory named  **‘jest-selenium-webdriver-sample’** and then we will create a subfolder named **‘test’**  with a test script name **‘single.test.js’** inside it.

**Step 7**: Finally, we will initialize our project by hitting the command npm init. This will create a package.json file in an interactive way, which will contain all our required project configurations. It will be required to execute our test script single.test.js. Here is that  **package.json**.
```
{
  "name": "jest-selenium-webdriver-sample",
  "version": "0.1.0",
  "description": "How to use Jest with Selenium tests on lambdatest",
  "keywords": [
    "javascript",
    "selenium",
    "local",
    "test",
    "jest"
  ],
  "scripts": {
    "test": "jest"
  },
  "author": "lambda qa",
  "license": "MIT",
  "devDependencies": {
    "babel-eslint": "^10.0.1",
    "babel-jest": "^24.8.0",
    "babel-plugin-external-helpers": "^6.22.0",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "chromedriver": "^74.0.0",
    "eslint": "^5.16.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-config-prettier": "^4.3.0",
    "eslint-plugin-import": "^2.17.3",
    "eslint-plugin-jest": "^22.6.4",
    "eslint-plugin-prettier": "^3.1.0",
    "jasmin": "0.0.2",
    "jasmine": "^3.4.0",
    "jest": "^24.9.0",
    "jest-environment-webdriver": "^0.2.0",
    "jsdom": "^15.1.1",
    "prettier": "^1.17.1",
    "rimraf": "^2.6.3",
    "selenium-webdriver": "^4.0.0-alpha.7"
  },
  "jest": {
    "setupTestFrameworkScriptFile": "./jest.config.js",
    "testEnvironment": "jest-environment-webdriver",
    "testEnvironmentOptions": {
      "browser": "chrome"
    }
  },
  "dependencies": {
    "@lambdatest/node-rest-client": "^1.0.0"
  },
  "main": "jest.config.js",
  "directories": {
    "test": "test"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/LambdaTest/jest-selenium-webdriver-sample.git"
  },
  "bugs": {
    "url": "https://github.com/LambdaTest/jest-selenium-webdriver-sample/issues"
  },
  "homepage": "https://github.com/LambdaTest/jest-selenium-webdriver-sample#readme"
}
```
## Executing First Script For Jest & Selenium Testing

**Test Scenario**: In this Jest tutorial, we will be creating a script that will invoke the browser launch with [LambdaTest TodoList Sample App](https://lambdatest.github.io/sample-todo-app/) that includes functionalities like check the box, typing text to add more items in the list, click  on Add button to add it into the list and will be  using assertions to verify the test cases. If assert returns true,  the test cases  pass successfully and show up in the automation logs dashboard, else if assert returns false, the test case fails, and the errors will be displayed in the automation log.

**Test Configurations**: The test will run over Google Chrome browser running on Windows 10.

```
const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const LambdaTestRestClient = require('@lambdatest/node-rest-client');
 
const username =  'LT_Username';          // Your LambdaTest Username
const accessKey ='LT_Access_Key';         // Your LambdaTest Access Key
 
const AutomationClient = LambdaTestRestClient.AutomationClient({
  username,
  accessKey
});
const capabilities = {                             // Desired Capabilities Class obtained From LambdaTest Capabilities Generator
  build: 'jest-LambdaTest-Single',
  browserName: 'Firefox',
  version: 'latest',
  platform: 'WIN8.1',
  video: true,
  network: true,
  console: true,
  visual: true
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

```
> The capabilities class was generated from the [LambdaTest Desired Capabilities Generator](https://www.lambdatest.com/capabilities-generator/).    

## Running The Jest Script On LambdaTest Selenium Grid

Open the command line in the same directory where the GitHub repository for jest sample code is  cloned, navigate to the **test** folder & run the below command.
```
npm test single.test.js
```
Once the test case is executed, you can assess its status over the LambdaTest Automation Dashboard. You can figure out whether the test has passed or failed, and can review the various kinds of test logs such as network logs, command logs, raw Selenium logs, and even video recording of the entire test execution. You will see the test result in the [lambdatest Dashboard](https://automation.lambdatest.com).
![LambdaTest Automation Dashboard](https://github.com/LambdaTest/jest-selenium-webdriver-sample/blob/master/tutorial-images/automation-dashboard.PNG)

If you notice your console output in the command line or terminal. You will find the below output.
![Command Line Output For Jest Tutorial Script](https://github.com/LambdaTest/jest-selenium-webdriver-sample/blob/master/tutorial-images/console_output.PNG)


## Test Your Locally Hosted Web Applications

You can also perform cross browser testing of your [locally hosted web application using Lambda Tunnel](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/). Lambda Tunnel establishes a secure shell connection between your localhost and our cloud servers to help you execute Selenium test automation for privately hosted projects. 

All you need to do is set the tunnel variable as true in your desired capabilities for running your Selenium script with Lambda Tunnel.

* Set **tunnel = true**
* Set **truetunnelName = 'Identifier name'** (Recommended in case more than 1 tunnels are connected.)

For example, to run the above test script through your localhost, your desired capabilities will be:

```
const capabilities = {
        platform: 'windows 10',
        browserName: 'firefox',
        version: 'latest',
        resolution: '1280x800',
        network: false,
        visual: false,
        console: false,
        video: true,
        tunnel: true,         // flag to run Selenium script on Lambda Tunnel
        name: 'Test 1',
        build: 'Jest build' 
}
```
> Note: You need to download the Lambda Tunnel binary file for your operating system. Refer to our support documentation for more information on [Lambda Tunnel](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/). 

> OS specific instructions to download and setup tunnel binary can be found at the following links.
>    - [Windows](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Windows)
>    - [Mac](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+MacOS)
>    - [Linux](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Linux)

### Important Note:
Some Safari & IE browsers, doesn't support automatic resolution of the URL string "localhost". Therefore if you test on URLs like "http://localhost/" or "http://localhost:8080" etc, you would get an error in these browsers. A possible solution is to use "localhost.lambdatest.com" or replace the string "localhost" with machine IP address. For example if you wanted to test "http://localhost/dashboard" or, and your machine IP is 192.168.2.6 you can instead test on "http://192.168.2.6/dashboard" or "http://localhost.lambdatest.com/dashboard".

## Running The Test Script In Local Browser
You can run the same script in the locally  installed browser of your system. Here is the code sample for Google Chrome browser, you can change the browser as per your usecase.

```
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
    driver = new webdriver.Builder().forBrowser('chrome').build();  // Specify Your Local Browser 
 
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
      driver,
      '//html/body/div/div/div/ul/li[6]/span'
    );
    const outputVal = await output.getText();
    expect(outputVal).toEqual("Yey, Let's add it to list");
  }, 10000);
});
```

Navigate to  the test folder and run the below command:
```
npm test local.test.js
```

## About LambdaTest

[LambdaTest](https://www.lambdatest.com/) is a cloud based selenium grid infrastructure that can help you run automated cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD platforms. It's a perfect solution to bring your [selenium automation testing](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut down your test execution time by running tests on parallel.

### Resources

##### [SeleniumHQ Documentation](http://www.seleniumhq.org/docs/)
##### [Jest Documentation](https://jestjs.io/en/)

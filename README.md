# Jest Selenium Tutorial

![LAMBDATEST Logo](https://opengraph.githubassets.com/50a78263b3d166a93531564d97ec9f2c3129f107bdb6e83b0327a8943c8609c9/LambdaTest/jest-environment-lambdatest)

## Prerequisites

1. Install npm.

```
sudo apt install npm
```

2. Install NodeJS.

```
sudo apt install nodejs
```

## Steps to Run your First Test

Step 1. Clone the Jest-Selenium-Webdriver-Sample Repository.

```
git clone https://github.com/LambdaTest/jest-selenium-webdriver-sample
```

Step 2. Inside Jest-Selenium-Webdriver-Sample folder, export the Lambda-test Credentials. You can get these from your automation dashboard.

<p align="center">
   <b>For Linux/macOS:</b>

```
export LT_USERNAME="YOUR_USERNAME"
export LT_ACCESS_KEY="YOUR ACCESS KEY"
```

<p align="center">
   <b>For Windows:</b>

```
set LT_USERNAME="YOUR_USERNAME"
set LT_ACCESS_KEY="YOUR ACCESS KEY"
```

Step 3. Inside Jest-Selenium-Webdriver-Sample folder install necessary packages.

```
cd jest-webdriver-sample
npm i
```

Step 4. To run your First Test.

```
npm test single.test.js
```

## See the Results

You can check your test results on the [Automation Dashboard](https://automation.lambdatest.com/build).
![LambdaTest Automation Dashboard](https://github.com/LambdaTest/jest-selenium-webdriver-sample/blob/master/tutorial-images/automation-dashboard.PNG)

If you notice your console output in the command line or terminal. You will find the below output.
![Command Line Output For Jest Tutorial Script](https://github.com/LambdaTest/jest-selenium-webdriver-sample/blob/master/tutorial-images/console_output.PNG)


 ###  Routing traffic through your local machine
 - Set tunnel value to `true` in test capabilities
 > OS specific instructions to download and setup tunnel binary can be found at the following links.
 >    - [Windows](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Windows)
 >    - [Mac](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+MacOS)
 >    - [Linux](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Linux)

### Run test locally
Navigate to  the test folder and run the below command:
```
npm test local.test.js
```
 ### Important Note:
 Some Safari & IE browsers, doesn't support automatic resolution of the URL string "localhost". Therefore if you test on URLs like "http://localhost/" or "http://localhost:8080" etc, you would get an error in these browsers. A possible solution is to use "localhost.lambdatest.com" or replace the string "localhost" with machine IP address. For example if you wanted to test "http://localhost/dashboard" or, and your machine IP is 192.168.2.6 you can instead test on "http://192.168.2.6/dashboard" or "http://localhost.lambdatest.com/dashboard".

## Notes
* You can view your test results on the [LambdaTest Automation Dashboard](https://www.automation.lambdatest.com)
* To test on a different set of browsers, check out our [capabilities generator](https://www.lambdatest.com/capabilities-generator)

## About LambdaTest
[LambdaTest](https://www.lambdatest.com/) is a cloud based selenium grid infrastructure that can help you run automated cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD platforms. It's a perfect solution to bring your [selenium automation testing](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut down your test execution time by running tests on parallel.

### Resources

##### [SeleniumHQ Documentation](http://www.seleniumhq.org/docs/)
##### [Jest Documentation](https://jestjs.io/en/)



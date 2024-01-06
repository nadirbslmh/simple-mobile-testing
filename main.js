import { remote } from "webdriverio";
import { expect } from "chai";

const capabilities = {
  platformName: process.env.PLATFORM_NAME,
  "appium:devicename": process.env.DEVICE_NAME,
  "appium:app": process.env.APP_DIR,
  "appium:automationName": process.env.AUTOMATION_NAME,
  "appium:autoGrantPermissions": process.env.AUTO_GRANT_PERMISSION,
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || "localhost",
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: "info",
  capabilities,
};

async function initDriver() {
  try {
    const driver = await remote(wdOpts);
    return driver;
  } catch (error) {
    console.error(error);
  }
}

async function addition() {
  const driver = await initDriver();
  try {
    const firstOperand = await driver.$(
      '//android.view.View[@content-desc="1"]'
    );
    await firstOperand.click();

    const operator = await driver.$('//android.view.View[@content-desc=" + "]');
    await operator.click();

    const secondOperand = await driver.$(
      '//android.view.View[@content-desc="5"]'
    );
    await secondOperand.click();

    const result = await driver.$(
      '(//android.view.View[@content-desc="6"])[1]'
    );

    const additionResult = await result.getAttribute("content-desc");

    expect(additionResult).to.equal("6");
  } catch (err) {
    console.error(err);
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

async function subtraction() {
  const driver = await initDriver();
  try {
    const firstOperand = await driver.$(
      '//android.view.View[@content-desc="5"]'
    );
    await firstOperand.click();

    const operator = await driver.$('//android.view.View[@content-desc=" - "]');
    await operator.click();

    const secondOperand = await driver.$(
      '//android.view.View[@content-desc="3"]'
    );
    await secondOperand.click();

    const result = await driver.$(
      '(//android.view.View[@content-desc="2"])[1]'
    );

    const subtractionResult = await result.getAttribute("content-desc");

    expect(subtractionResult).to.equal("2");
  } catch (err) {
    console.error(err);
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

async function runTests() {
  await addition().catch(console.error);
  await subtraction().catch(console.error);
}

runTests();

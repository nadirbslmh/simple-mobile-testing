const { remote } = require("webdriverio");

console.log("the env: ", process.env.PLATFORM_NAME);

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

    const actual = await result.getAttribute("content-desc");

    console.log("the result: ", actual);
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

async function tapThreeButton() {
  const driver = await initDriver();
  try {
    const buttonItem = await driver.$('//android.view.View[@content-desc="3"]');
    await buttonItem.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

async function runTests() {
  await addition().catch(console.error);
  await tapThreeButton().catch(console.error);
}

runTests();

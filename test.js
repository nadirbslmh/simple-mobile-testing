const { remote } = require("webdriverio");

const capabilities = {
  platformName: "Android",
  "appium:devicename": "device",
  "appium:app": "/home/nadir/Downloads/calculator-alta-qe.apk",
  "appium:automationName": "UIAutomator2",
  "appium:autoGrantPermissions": true,
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || "localhost",
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: "info",
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const buttonItem = await driver.$('//android.view.View[@content-desc="1"]');
    await buttonItem.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

async function runTest2() {
  const driver = await remote(wdOpts);
  try {
    const buttonItem = await driver.$('//android.view.View[@content-desc="3"]');
    await buttonItem.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

async function runTestsSequentially() {
  await runTest().catch(console.error);
  await runTest2().catch(console.error);
}

runTestsSequentially();

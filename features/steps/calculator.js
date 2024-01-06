import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import initDriver from "../../configs/driver.js";
import { expect } from "chai";

let driver;

Before({ timeout: 6000 * 10000 }, async () => {
  try {
    driver = await initDriver();
  } catch (error) {
    console.error(error);
  }
});

Given("I am on the calculator page", async () => {
  const titleComponent = await driver.$(
    '//android.view.View[@content-desc="Calculator"]'
  );
  const title = await titleComponent.getAttribute("content-desc");
  expect(title).to.equal("Calculator");
});

When("I tap number 1", async () => {
  const firstOperand = await driver.$('//android.view.View[@content-desc="1"]');
  await firstOperand.click();
});

Then("I tap plus operator", async () => {
  const operator = await driver.$('//android.view.View[@content-desc=" + "]');
  await operator.click();
});

Then("I tap number 5", async () => {
  const secondOperand = await driver.$(
    '//android.view.View[@content-desc="5"]'
  );
  await secondOperand.click();
});

Then("the addition result is 6", async () => {
  const result = await driver.$('(//android.view.View[@content-desc="6"])[1]');

  const additionResult = await result.getAttribute("content-desc");

  expect(additionResult).to.equal("6");
});

When("I tap number 6", async () => {
  const firstOperand = await driver.$('//android.view.View[@content-desc="6"]');
  await firstOperand.click();
});

Then("I tap minus operator", async () => {
  const operator = await driver.$('//android.view.View[@content-desc=" - "]');
  await operator.click();
});

Then("I tap number 3", async () => {
  const secondOperand = await driver.$(
    '//android.view.View[@content-desc="3"]'
  );
  await secondOperand.click();
});

Then("the subtraction result is 3", async () => {
  const result = await driver.$('(//android.view.View[@content-desc="3"])[1]');

  const subtractionResult = await result.getAttribute("content-desc");

  expect(subtractionResult).to.equal("3");
});

After(async () => {
  await driver.deleteSession();
});

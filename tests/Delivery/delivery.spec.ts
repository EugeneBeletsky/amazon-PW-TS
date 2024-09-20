import { test, expect } from '@playwright/test';
import HomePage from '../../Models/HomePage/HomePage';
import Utils from '../../Models/Utils/Utils';
import Captcha from '../../Models/Captcha/Captcha';
import SignIn from '../../Models/SignIn/SignIn';
import Search from '../../Models/Search/Search';
import Delivery from '../../Models/HomePage/components/DeliveryBlock';

test.beforeEach(async ({ page }) => {
    let utils = new Utils(page);
    await utils.navigateToBaseURL();
});

test('@P3 @smoke Deliver to other countries: JPN', async ({ page }) => {
    test.setTimeout(30000);
    let delivery = new Delivery(page);
    await delivery.chooseCountryByName('Japan');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('Japan');
});

test('@P4 Deliver to other countries: CHN', async ({ page }) => {
    test.setTimeout(30000);
    let delivery = new Delivery(page);
    await delivery.chooseCountryByName('China');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('China');
});

test('@P4 Deliver to other countries: BLR', async ({ page }) => {
    test.setTimeout(30000);
    let delivery = new Delivery(page);
    await delivery.chooseCountryByName('Belarus');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('Belarus');
});

test('@P4 Deliver to other countries: NGR', async ({ page }) => {
    test.setTimeout(30000);
    let delivery = new Delivery(page);
    await delivery.chooseCountryByName('Nigeria');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('Nigeria');
});

test('@smoke Deliver to other countries with SignIn: Germany', async ({ page }) => {
    test.setTimeout(30000);
    let delivery = new Delivery(page);
    let signin = new SignIn(page);
    await signin.signInViaCredentials();
    await delivery.chooseCountryByName('Germany');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('Germany');
});

test('@P4 Deliver to USA: New York 10001', async ({ page }) => {
    test.setTimeout(30000);
    let delivery = new Delivery(page);
    await delivery.deliverToUSA('10001');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('New York 10001');
});

test('@P4 Deliver to USA: Los Angeles 90210', async ({ page }) => {
    let delivery = new Delivery(page);
    await delivery.deliverToUSA('90210');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('Beverly H... 90210');
});

test('@smoke Deliver to USA with SignIn: Alaska 99501', async ({ page }) => {
    test.setTimeout(30000);
    let delivery = new Delivery(page);
    await delivery.deliverToUSA('99501');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('Anchorage 99501');
});

test.only('@P4 Deliver to USA signed in: invalid ZIP CODE 32386', async ({ page }) => {
    test.setTimeout(30000);
    let delivery = new Delivery(page);
    await delivery.openDeliverBlock();
    await page.waitForTimeout(2000);
    await delivery.fillZIPinput('32386');
    await delivery.clickApplyZIP();
    await page.waitForLoadState();
    await page.waitForTimeout(1000);
    await delivery.checkInvalidZipCodeError('Please enter a valid US zip code');
});

test('@P4 Change delivery from one country to another', async ({ page }) => {
    test.setTimeout(30000);
    let delivery = new Delivery(page);
    await delivery.chooseCountryByName('Germany');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('Germany');
    await delivery.chooseCountryByName('Belarus');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('Belarus');
    await delivery.chooseCountryByName('Argentina');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('Argentina');
});

test('@P4 Change delivery from one country to US ZIP code', async ({ page }) => {
    test.setTimeout(30000);
    let delivery = new Delivery(page);
    await delivery.chooseCountryByName('Germany');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('Germany');
    await delivery.deliverToUSA('10001');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('New York 10001');
});

test('@P4 Change delivery from US ZIP code to other country', async ({ page }) => {
    test.setTimeout(30000);
    let delivery = new Delivery(page);
    await delivery.deliverToUSA('10001');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('New York 10001');
    await delivery.chooseCountryByName('Greece');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('Greece');
});

import { test, expect } from '@playwright/test';
import HomePage from '../../Models/HomePage/HomePage';
import Utils from '../../Models/Utils/Utils';
import Captcha from '../../Models/Captcha/Captcha';
import SignIn from '../../Models/SignIn/SignIn';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env', override: true });

test.beforeEach(async ({ page }) => {});

test('Enter email that not exist', async ({ page }) => {
    test.setTimeout(30000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo('https://www.amazon.com');
    await captcha.checkCaptchaAndPauseIfPresent();
    await utils.checkPageURL('amazon');
    await utils.clickOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    let test_email = await utils.generateRandomEmail();
    await signin.typeEmail(test_email);
    await utils.clickOnButton(await signin.getContinueButton());
    await page.waitForLoadState();
    await signin.errorBoxIsVisible(true);
    await signin.messageIs('We cannot find an account with that email address');
});

test('Enter email with not valid expression', async ({ page }) => {
    test.setTimeout(30000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo('https://www.amazon.com');
    await captcha.checkCaptchaAndPauseIfPresent();
    await utils.checkPageURL('amazon');
    await utils.clickOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    let test_email = await utils.generateRandomEmail();
    await signin.typeEmail(`${test_email}asd123zxc456!@#$%^^Äε↓Iπ╟╚→┌`);
    await utils.clickOnButton(await signin.getContinueButton());
    await signin.alertIs('Wrong or Invalid email address or mobile phone number. Please correct and try again.');
});

test('Enter valid email and non-valid password', async ({ page }) => {
    const username = process.env.USERNAME;
    test.setTimeout(30000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo('https://www.amazon.com');
    await captcha.checkCaptchaAndPauseIfPresent();
    await utils.checkPageURL('amazon');
    await utils.clickOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    await signin.typeEmail(username);
    await utils.clickOnButton(await signin.getContinueButton());
    let test_pass = await utils.generateRandomPassword();
    await signin.typePassword(test_pass);
    await utils.clickOnButton(await signin.getSignInButton());
    await signin.errorBoxIsVisible(true);
    await signin.messageIs('Your password is incorrect');
});

test('Enter valid email and non-valid password then forgot password', async ({ page }) => {
    const username = process.env.USERNAME;
    test.setTimeout(30000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo('https://www.amazon.com');
    await captcha.checkCaptchaAndPauseIfPresent();
    await utils.checkPageURL('amazon');
    await utils.clickOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    await signin.typeEmail(username);
    await utils.clickOnButton(await signin.getContinueButton());
    let test_pass = await utils.generateRandomPassword();
    await signin.typePassword(test_pass);
    await utils.clickOnButton(await signin.getSignInButton());
    await signin.errorBoxIsVisible(true);
    await signin.messageIs('Your password is incorrect');
    await utils.clickOnButton(await signin.getForgotPasswordButton());
    await page.waitForLoadState();
    let test_email = await utils.generateRandomEmail();
    await signin.typeEmail(test_email);
    await utils.clickOnButton(await signin.getContinueButton());
    await signin.messageIs(`We're sorry. We weren't able to identify you given the information provided.`);
    await signin.typeEmail(username);
    // DO NOT CLICK, will trigger reset pass, leave it commented
    // await utils.clickOnButton(await signin.getContinueButton());
});

test('Enter valid email and valid password', async ({ page }) => {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    test.setTimeout(30000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo('https://www.amazon.com');
    await captcha.checkCaptchaAndPauseIfPresent();
    await utils.checkPageURL('amazon');
    await utils.clickOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    await signin.typeEmail(username);
    await utils.clickOnButton(await signin.getContinueButton());
    await signin.typePassword(password);
    await utils.clickOnButton(await signin.getSignInButton());
    await page.waitForLoadState();
    await signin.youHaveSuccessSignIn();
});

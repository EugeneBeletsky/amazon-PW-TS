import { test, expect } from '@playwright/test';
import HomePage from '../../Models/HomePage/HomePage';
import Utils from '../../Models/Utils/Utils';
import Captcha from '../../Models/Captcha/Captcha';
import SignIn from '../../Models/SignIn/SignIn';
import NewAccount, { AlertType } from '../../Models/SignIn/NewAccount';
import * as dotenv from 'dotenv';
dotenv.config();

test.beforeEach(async ({ page }) => {
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo('https://www.amazon.com');
    await captcha.checkCaptchaAndExitIfPresent();
    await utils.checkPageURL('amazon');
    await utils.clickOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    await utils.clickOnButton(await signin.getCreateNewAccountButton());
});

test('Input only invalid short pass', async ({ page }) => {
    test.setTimeout(60000);
    let utils = new Utils(page);
    let signin = new SignIn(page);
    let newaccount = new NewAccount(page);
    let name = await utils.generateRandomName();
    let email = await utils.generateRandomEmail();
    let pass = await utils.generateRandomPassword();
    await newaccount.createAccountPageOpens();
    await newaccount.typeUserName(name);
    await newaccount.typeEmail(email);
    await newaccount.typePassword('1');
    await utils.clickOnButton(await signin.getContinueButton());
    await newaccount.alertIs('Minimum 6 characters required', AlertType.pass);
    await newaccount.alertIs('Type your password again', AlertType.repass);
});

test('Input only invalid name', async ({ page }) => {
    test.setTimeout(60000);
    let utils = new Utils(page);
    let signin = new SignIn(page);
    let newaccount = new NewAccount(page);
    let name = await utils.generateRandomName();
    let email = await utils.generateRandomEmail();
    let pass = await utils.generateRandomPassword();
    await newaccount.createAccountPageOpens();
    await newaccount.typeUserName('1');
    await utils.clickOnButton(await signin.getContinueButton());
    await newaccount.alertIs('Minimum 6 characters required', AlertType.pass);
    await newaccount.alertIs('Enter your email or mobile phone number', AlertType.email);
});

// possible alerts
// await newaccount.alertIs('Enter your name', AlertType.name);
// await newaccount.alertIs('Enter your email or mobile phone number', AlertType.email);
// await newaccount.alertIs('Minimum 6 characters required', AlertType.pass);
// await newaccount.alertIs('Type your password again', AlertType.repass);

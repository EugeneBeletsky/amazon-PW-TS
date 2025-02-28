import { test, expect } from '@playwright/test';
import HomePage from '../../Models/HomePage/HomePage';
import Utils from '../../Models/Utils/Utils';
import Captcha from '../../Models/Captcha/Captcha';
import SignIn from '../../Models/SignIn/SignIn';
import NewAccount from '../../Models/SignIn/NewAccount';
import { AlertType } from '../../Models/SignIn/AlertType';
import * as dotenv from 'dotenv';
dotenv.config();

test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    const captcha = new Captcha(page);
    const utils = new Utils(page);
    const homepage = new HomePage(page);
    const signin = new SignIn(page);
    await utils.navigateToBaseURL();
    await captcha.handleCaptchaIfPresent();
    await utils.checkPageURL('amazon');
    await signin.clickSignInButton();
    await signin.signInPageOpens();
    await signin.clickCreateNewAccountButton();
});

test.setTimeout(60 * 1000);

test('Input only invalid short password', async ({ page }) => {
    const utils = new Utils(page);
    const signin = new SignIn(page);
    const newaccount = new NewAccount(page);
    const name = await utils.generateRandomName();
    const email = await utils.generateRandomEmail();
    await newaccount.createAccountPageOpens();
    await newaccount.typeUserName(name);
    await newaccount.typeEmail(email);
    await newaccount.typePassword('1');
    await signin.clickContinueButton();
    await newaccount.alertIs('Minimum 6 characters required', AlertType.pass);
    await newaccount.alertIs('Type your password again', AlertType.repass);
});

test('Input only invalid name', async ({ page }) => {
    const utils = new Utils(page);
    const signin = new SignIn(page);
    const newaccount = new NewAccount(page);
    const email = await utils.generateRandomEmail();
    await newaccount.createAccountPageOpens();
    await newaccount.typeUserName('1');
    await newaccount.typeEmail(email);
    await signin.clickContinueButton();
    await newaccount.alertIs('Minimum 6 characters required', AlertType.pass);
    await newaccount.alertIs('Enter your email or mobile phone number', AlertType.email);
});
import { test, expect, Page } from '@playwright/test';
import HomePage from '../../Models/HomePage/HomePage';
import Utils from '../../Models/Utils/Utils';
import Captcha from '../../Models/Captcha/Captcha';
import SignIn from '../../Models/SignIn/SignIn';
import * as dotenv from 'dotenv';

let page: Page;
let signin: SignIn;
let utils: Utils;
let captcha: Captcha;
let homepage: HomePage;

dotenv.config({ path: '.env', override: true });


test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    utils = new Utils(page);
    captcha = new Captcha(page);
    homepage = new HomePage(page);
    signin = new SignIn(page);
    await utils.navigateToBaseURL();
    await captcha.handleCaptchaIfPresent();
    await page.waitForTimeout(3000);
});

test.setTimeout(60 * 1000);

test('Sign In via valid credentials @smoke', async () => {    
    await signin.signInViaCredentials();
});

test('Enter email that does not exist', async () => {
    await utils.checkPageURL('amazon');
    await homepage.clickSignInButton();
    await signin.signInPageOpens();
    
    const testEmail = await utils.generateRandomEmail();
    await signin.typeEmail(testEmail);
    await signin.clickContinueButton();
    
    await page.waitForLoadState();
    await signin.errorBoxIsVisible(true);
    await signin.messageIs('We cannot find an account with that email address');
});

test('Enter email with invalid format', async () => {
    await utils.checkPageURL('amazon');
    await homepage.clickSignInButton();
    await signin.signInPageOpens();
    
    const testEmail = await utils.generateRandomEmail();
    await signin.typeEmail(`${testEmail}asd123zxc456!@#$%^^Äε↓Iπ╟╚→┌`);
    await signin.clickContinueButton();
    
    await signin.alertIs('Wrong or Invalid email address or mobile phone number. Please correct and try again.');
});

test('Enter valid email and invalid password', async () => {
    const username = process.env.USERNAME;

    await utils.checkPageURL('amazon');
    await homepage.clickSignInButton();
    await signin.signInPageOpens();
    
    await signin.typeEmail(username);
    await signin.clickContinueButton();
    
    const testPass = await utils.generateRandomPassword();
    await signin.typePassword(testPass);
    await signin.clickSignInButton();
    
    await signin.errorBoxIsVisible(true);
    await signin.messageIs('Your password is incorrect');
});

test('Enter valid email and invalid password then test forgot password flow', async () => {
    const username = process.env.USERNAME;
    
    await utils.checkPageURL('amazon');
    await homepage.clickSignInButton();
    await signin.signInPageOpens();
    
    await signin.typeEmail(username);
    await signin.clickContinueButton();
    
    const testPass = await utils.generateRandomPassword();
    await signin.typePassword(testPass);
    await signin.clickSignInButton();
    
    await signin.errorBoxIsVisible(true);
    await signin.messageIs('Your password is incorrect');
    await signin.clickForgotPasswordButton();
    
    await page.waitForLoadState();
    await signin.forgotPasswordBlockIsOpened();
    await signin.verifyCurrentEmail(username);

    const testEmail = await utils.generateRandomEmail();
    await signin.typeEmail(testEmail);
    await signin.clickContinueButton();
    
    await signin.messageIs(`We're sorry. We weren't able to identify you given the information provided.`);
    await signin.typeEmail(username);
    // DO NOT CLICK, will trigger reset pass, leave it commented
    // await signin.clickContinueButton();
});

test('Enter valid email and valid password', async () => {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    
    await utils.checkPageURL('amazon');
    await homepage.clickSignInButton();
    await signin.signInPageOpens();
    
    await signin.typeEmail(username);
    await signin.clickContinueButton();
    await signin.typePassword(password);
    await signin.clickSignInButton();
    
    await page.waitForLoadState();
    await signin.youHaveSuccessSignIn();
});

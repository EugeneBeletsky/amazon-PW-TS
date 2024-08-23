import {test, expect} from '@playwright/test';
import HomePage from '../../Models/HomePage/HomePage';
import Utils from '../../Models/Utils/Utils';
import Captcha from '../../Models/Captcha/Captcha';
import SignIn from '../../Models/SignIn/SignIn';
import * as dotenv from 'dotenv';
dotenv.config();


test.beforeEach(async ({ page }) => {

});

test('Enter email that not exist', async ({ page}) => {
    test.setTimeout(60000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo("https://www.amazon.com");
    await captcha.checkCaptchaAndExitIfPresent();
    await utils.checkPageURL("amazon");
    await utils.cliclOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    await signin.typeEmail('ivanivanov@gmail.com');
    await utils.cliclOnButton(await signin.getContinueButton());
    await signin.errorBoxIsVisible(true);
    await signin.messageIs('We cannot find an account with that email address');
});

test('Enter email with not valid expression', async ({ page}) => {
    test.setTimeout(60000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo("https://www.amazon.com");
    await captcha.checkCaptchaAndExitIfPresent();
    await utils.checkPageURL("amazon");
    await utils.cliclOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    await signin.typeEmail('asd123zxc456!@#$%^^Äε↓Iπ╟╚→┌');
    await utils.cliclOnButton(await signin.getContinueButton());
    await signin.alertIs('Wrong or Invalid email address or mobile phone number. Please correct and try again.');
});

test('Enter valid email and non-valid password', async ({ page}) => {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    test.setTimeout(60000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo("https://www.amazon.com");
    await captcha.checkCaptchaAndExitIfPresent();
    await utils.checkPageURL("amazon");
    await utils.cliclOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    await signin.typeEmail(username);
    await utils.cliclOnButton(await signin.getContinueButton());
    await signin.typePassword('aaaaaaaaaaaaaaa');
    await utils.cliclOnButton(await signin.getSignInButton());
    await signin.errorBoxIsVisible(true);
    await signin.messageIs('Your password is incorrect');
});

test('Enter valid email and non-valid password and forgot password', async ({ page}) => {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    test.setTimeout(60000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo("https://www.amazon.com");
    await captcha.checkCaptchaAndExitIfPresent();
    await utils.checkPageURL("amazon");
    await utils.cliclOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    await signin.typeEmail(username);
    await utils.cliclOnButton(await signin.getContinueButton());
    await signin.typePassword('aaaaaaaaaaaaaaa');
    await utils.cliclOnButton(await signin.getSignInButton());
    await signin.errorBoxIsVisible(true);
    await signin.messageIs('Your password is incorrect');
    await utils.cliclOnButton(await signin.getForgotPasswordButton());
    await page.waitForLoadState();
    await signin.typeEmail(username);
    await utils.cliclOnButton(await signin.getContinueButton());
});

test('Enter valid email and valid password', async ({ page}) => {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    test.setTimeout(60000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo("https://www.amazon.com");
    await captcha.checkCaptchaAndExitIfPresent();
    await utils.checkPageURL("amazon");
    await utils.cliclOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    await signin.typeEmail(username);
    await utils.cliclOnButton(await signin.getContinueButton());
    await signin.typePassword(password);
    await utils.checkPageURL('https://www.amazon.com/');
});
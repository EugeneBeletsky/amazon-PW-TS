import {test, expect} from '@playwright/test';
import HomePage from '../Models/HomePage/HomePage';
import Utils from '../Models/Utils/Utils';
import Captcha from '../Models/Captcha/Captcha';
import SignIn from '../Models/SignIn/SignIn';


test.beforeEach(async ({ page }) => {

});

test('My first test amazon', async ({ page}) => {
    test.setTimeout(60000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    await utils.navigateTo("https://www.amazon.com/ref=nav_logo");
    await captcha.checkCaptchaAndExitIfPresent();
    await utils.checkPageURL("amazon");
    await utils.cliclOnButton(await homepage.getSignInButton());
    await signin.signInPageOpens();
    await signin.typeEmail('yauhenibialetski@gmail.com');
    await utils.cliclOnButton(await signin.getContinueButton())





});
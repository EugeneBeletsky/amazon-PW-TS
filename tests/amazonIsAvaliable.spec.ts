import { test, expect, Page } from '@playwright/test';
import Utils from '../Models/Utils/Utils';
import Captcha from '../Models/Captcha/Captcha';
import HomePage from '../Models/HomePage/HomePage';
import * as dotenv from 'dotenv';

let page: Page;
let utils: Utils;
let captcha: Captcha;
let homepage: HomePage;

dotenv.config({ path: '.env', override: true });

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.waitForTimeout(3000);
    utils = new Utils(page);
    captcha = new Captcha(page);
    await utils.navigateToBaseURL();
});

test('Check if amazon.com is available @smoke', async () => {
    await captcha.handleCaptchaIfPresent();
    await utils.checkPageURL('amazon'); 
    const title = await page.title(); 
    expect(title).toContain('Amazon');
});

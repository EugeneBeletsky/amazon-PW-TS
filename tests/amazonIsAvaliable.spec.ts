import { test, expect } from '@playwright/test';
import Utils from '../Models/Utils/Utils';
import Captcha from '../Models/Captcha/Captcha';

test.beforeEach(async ({ page }) => {
    const utils = new Utils(page);
    await utils.navigateToBaseURL();
});

test('Check if amazon.com is available @smoke', async ({ page }) => {
    const utils = new Utils(page);
    const captcha = new Captcha(page);
    await captcha.handleCaptchaIfPresent();
    await utils.checkPageURL('amazon'); 
    const title = await page.title(); 
    expect(title).toContain('Amazon');
});

import { Locator, expect, test } from "@playwright/test";
import { Page, Selectors } from "playwright";
import { ElementHandle } from "@playwright/test";

export default class Captcha {
    page:Page;

    constructor(page: Page) {
        this.page = page;        
      };

  public async checkCaptchaAndExitIfPresent() {
    const captchaImage = await this.page.$(LOCATORS.captchaSelector);
    if (captchaImage) {
      console.log('CAPTCHA detected. Exiting the test.');
      await this.page.screenshot({ path: 'captcha_detected.png' });
      console.log(`Test stopped at URL: ${await this.page.url()}`);
      throw new Error('CAPTCHA detected. Test execution stopped.');
    };
  };
};


const LOCATORS = {
    captchaSelector: 'img[src*="captcha"]',
    captchaFieldSelector: 'input#captchacharacters',
    captchaSubmitButtonSelector: 'button[type="submit"]'    
  };
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
      await this.page.screenshot({ path: './screenshots/captcha_detected.png' });
      console.log(`Test stopped at URL: ${await this.page.url()}`);
      throw new Error('CAPTCHA detected. Test execution stopped.');
    };
  };

  public async typeCaptcha(captcha:string) {
    const input = await this.page.locator('#captchacharacters');
    input.fill(captcha);
  };

  public async clickContinue() {
    const button = await this.page.locator('.a-button-text').filter({hasText: 'Continue shopping'});
    button.click();
  };
};


const LOCATORS = {
    captchaSelector: 'img[src*="captcha"]',
    captchaFieldSelector: 'input#captchacharacters',
    captchaSubmitButtonSelector: 'button[type="submit"]'    
  };
import { Page, Locator, test } from '@playwright/test';

export default class Captcha {
  private readonly page: Page;
  private readonly locators = {
    captchaImage: 'img[src*="captcha"]',
    captchaInput: 'input#captchacharacters',
    continueButton: '.a-button-text',
    submitButton: 'button[type="submit"]'
  };

  constructor(page: Page) {
    this.page = page;
  }

  /**
     * Checks for the presence of CAPTCHA and terminates the test if detected
     * @throws {Error} If CAPTCHA is detected
     */
  public async checkCaptchaAndExitIfPresent(): Promise<void> {
    const captchaImage = await this.page.locator(this.locators.captchaImage);
        
    if (captchaImage) {
      await this.handleCaptchaIfPresent();
    }
  }    

  /**
     * Enters text into the CAPTCHA input field
     * @param captcha - CAPTCHA text to enter
     */
  public async typeCaptcha(captcha: string): Promise<void> {
    await this.page.locator(this.locators.captchaInput).fill(captcha);
  }

  /**
     * Clicks the continue button
     */
  public async clickContinue(): Promise<void> {
    await this.page
      .locator(this.locators.continueButton)
      .filter({ hasText: 'Continue shopping' })
      .click();
  }

  /**
     * Handles CAPTCHA detection
     * @private
     */
  public async handleCaptchaIfPresent(): Promise<void> {
    const captchaElement = await this.page.locator(this.locators.captchaInput).first();
    const timeout = 30000; // 30 seconds
    const startTime = Date.now();

    console.log('Waiting for CAPTCHA to be filled...');

    while (Date.now() - startTime < timeout) {
      if (!(await captchaElement.isVisible())) {
        console.log('CAPTCHA has been filled or is no longer visible. Continuing the test.');
        return; // Continue with the test
      }
      await this.page.waitForTimeout(1000); // Wait for 1 second before checking again
    }

    console.log('CAPTCHA still visible after 30 seconds. Skipping the test.');
    test.skip(); // Skip the test if CAPTCHA is still visible after 30 seconds
  }        
}
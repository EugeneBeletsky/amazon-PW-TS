import { Locator, expect, test } from "@playwright/test";
import { Page, Selectors } from "playwright";
import { ElementHandle } from "@playwright/test";

export default class SignIn {
  page:Page

  constructor(page:Page) {
    this.page = page;
  }

  public async signInPageOpens() {
    const body = await this.page.getByRole('heading', { name: 'Sign in' });
    await expect(body).toBeVisible();
  }

  public async typeEmail(email:string) {
    const emailInput = await this.page.locator('#ap_email');
    emailInput.fill(email);
  }

  public async typePassword(pass:string) {
    const passwordInput = await this.page.locator('#ap_password');
    passwordInput.fill(pass);
  }

  public async getSignInButton(): Promise <Locator> {
    return await this.page.locator('#signInSubmit');
  }

  public async getContinueButton(): Promise <Locator> {
    return await this.page.getByLabel('Continue');
  }

  public async errorBoxIsVisible(state: boolean) {
    const box = await this.page.locator('#auth-error-message-box');
    await expect(box).toBeVisible({visible: state});
  }

  public async messageIs(message: string) {
    const text = await this.page.locator('.a-list-item').nth(0).textContent();
    await expect(text).toBe(message);
  }

  public async alertIs(alert: string) {
    const text = await this.page.locator('.a-alert-content').textContent();
    await expect(text).toBe(alert);
  }

}

const LOCATORS = {  
}
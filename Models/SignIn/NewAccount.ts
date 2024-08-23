import { Locator, expect, test } from "@playwright/test";
import { Page, Selectors } from "playwright";
import { ElementHandle } from "@playwright/test";

export const enum AlertType {
    name = 0,
    email = 1,
    pass = 2,
    repass = 3    
}

export default class NewAccount {
  page:Page

  constructor(page:Page) {
    this.page = page;
  }

  public async createAccountPageOpens() {
    const body = await this.page.getByRole('heading', { name: 'Create account' });
    await expect(body).toBeVisible();
  }

  public async typeUserName(name:string) {
    const userInput = await this.page.locator('#ap_customer_name');
    userInput.fill(name);
  }

  public async typeEmail(email:string) {
    const emailInput = await this.page.locator('#ap_email');
    emailInput.fill(email);
  }

  public async typePassword(pass:string) {
    const passwordInput = await this.page.locator('#ap_password');
    passwordInput.fill(pass);
  }

  public async typeReEnterPassword(pass:string) {
    const rePassInput = await this.page.locator('#ap_password_check');
    rePassInput.fill(pass);
  }

  public async alertIs(alert: string, alertType: AlertType) {
    const message = await this.page.locator('.a-alert-content').nth(alertType).textContent();
    await expect(message).toContain(alert);
  }

  //////////////////////////////////////////////////////////////////////////



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



  public async getCreateNewAccountButton(): Promise <Locator> {
    return await this.page.locator('#createAccountSubmit');
  }

  public async getForgotPasswordButton(): Promise <Locator> {
    return await this.page.locator('#auth-fpp-link-bottom');
  }

}

const LOCATORS = {  
}
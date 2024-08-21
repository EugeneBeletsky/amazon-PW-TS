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
    const emailInput = await this.page.getByLabel('Email or mobile phone number');
    emailInput.fill(email);
  }

  public async getContinueButton(): Promise <Locator> {
    return await this.page.getByLabel('Continue');
  }

}

const LOCATORS = {  
}
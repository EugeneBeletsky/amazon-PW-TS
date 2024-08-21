import { Page, Locator, expect, test } from "@playwright/test";

export default class Utils {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

    public async navigateTo(url:string) {
        await this.page.goto(`${url}`, { waitUntil: 'load' })
    }

    public async checkPageURL(url:string) {
        const currentURL = await this.page.url();
        await expect(currentURL).toContain(url)
    }

    public async cliclOnButton(locator:Locator): Promise <void> {
        await locator.waitFor();
        await locator.click();
    }
}
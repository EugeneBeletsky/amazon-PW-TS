import { Page, expect } from "@playwright/test"
import s from "./locators"


export default class Utils {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

    async navigateTo(url:string) {
        await this.page.goto(`${url}`, { waitUntil: 'load' })
    }

    async checkPageURL(url:string) {
        const currentURL = await this.page.url();
        expect(currentURL).toContain(url)
    }

    async cliclOnButton(locator:string) {
        await this.page.waitForSelector(locator)
        await this.page.click(locator)
}

}
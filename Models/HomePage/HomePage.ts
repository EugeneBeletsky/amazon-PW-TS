import { Locator, expect, test } from "@playwright/test";
import fs from 'fs';
import s from './locators';
import { Page, Selectors } from "playwright";
import { ElementHandle } from "@playwright/test";

export default class HomePage {  

  static async clickOnTab(page:Page, name: string) {
    await page.waitForSelector(s.tabs);
    const tabElement = await page.locator(s.tabs, {hasText:`${name}`});
    await tabElement.waitFor({ state: 'visible' }); 
    await tabElement.click(); 
  }

  static async navigateTo(page:Page, url:string) {
    await page.goto(`${url}`, { waitUntil: 'load' })
}

}
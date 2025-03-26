import { Page, Locator, expect, test } from '@playwright/test';

export default class SearchBox {
  private readonly page: Page;
  private readonly locators = {
    input: '#twotabsearchtextbox',
    submit_input: '#nav-search-submit-button',
    category_button: '#searchDropdownBox',
  };

  constructor(page: Page) {
    this.page = page;
  }

  public async searchType(value: string): Promise<void> {
    const search = await this.page.locator(this.locators.input);
    search.fill(value);
  }

  public async submitSearch(): Promise<void> {
    await this.page.locator(this.locators.submit_input).click();
  }

  public async clickCategory(): Promise<void> {
    await this.page.locator(this.locators.category_button).click();
  }

  public async pickCategory(category: string): Promise<void> {
    await this.page
      .locator(this.locators.category_button)
      .locator('select option')
      .filter({ hasText: category })
      .click();
  }

  public async changeCategory(category: string): Promise<void> {
    await this.clickCategory();
    await this.pickCategory(category);
  }

  public async searchItem(item: string, category?: string): Promise<void> {
    if (category) {
      await this.changeCategory(category);
    }
    await this.searchType(item);
    await this.submitSearch();
  }    
}
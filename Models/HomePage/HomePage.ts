import { Locator, Page } from '@playwright/test';

export default class HomePage {
  private readonly page: Page;
  private readonly locators = {
    mainLogo: '#nav-logo-sprites',
    tabs: '.tabs__item',
    signInButton: 'a[role="link"][name="Sign in"]'
  };

  constructor(page: Page) {
    this.page = page;
  }

  /**
     * Navigates to the main page by clicking the logo
     */
  public async navigateToMainPage(): Promise<void> {
    const logo = await this.page.locator(this.locators.mainLogo);
    await logo.click();
  }

  /**
     * Clicks on a specific tab by name
     * @param name - The name of the tab to click
     */
  public async clickOnTab(name: string): Promise<void> {
    await this.page.waitForSelector(this.locators.tabs);
    const tabElement = await this.page.locator(this.locators.tabs, { hasText: `${name}` });
    await tabElement.waitFor({ state: 'visible' });
    await tabElement.click();
  }

  /**
     * Gets the sign in button locator
     * @returns Locator for the sign in button
     */
  public async clickSignInButton(): Promise<void> {
    await this.page.getByRole('link', { name: 'Sign in', exact: true }).click();
  }
}

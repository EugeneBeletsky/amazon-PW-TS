import { Locator, expect, test } from '@playwright/test';
import { Page, Selectors } from 'playwright';
import { ElementHandle } from '@playwright/test';

export default class HomePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateToMainPage() {
        const logo = await this.page.locator(LOCATORS.main_logo);
        logo.click();
    }

    public async clickOnTab(name: string) {
        await this.page.waitForSelector(LOCATORS.tabs);
        const tabElement = await this.page.locator(LOCATORS.tabs, { hasText: `${name}` });
        await tabElement.waitFor({ state: 'visible' });
        await tabElement.click();
    }

    public async getSignInButton(): Promise<Locator> {
        return await this.page.getByRole('link', { name: 'Sign in', exact: true });
    }
}

const LOCATORS = {
    deliver_block: '#glow-ingress-block',
    deliver_block_body: '.a-popover-wrapper',
    main_logo: '#nav-logo-sprites',
    tabs: '.tabs__item',
};

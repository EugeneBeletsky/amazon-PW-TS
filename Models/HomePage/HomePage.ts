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

    public async openDeliverBlock() {
        const deliverBlock = await this.page.locator('#glow-ingress-block');
        deliverBlock.click();
        const popup = await this.page.locator('.a-popover-wrapper');
        expect(popup).toBeVisible();
    }

    public async deliverToUSA(zip:string) {
        await this.openDeliverBlock();
        const zipInput = await this.page.locator('#GLUXZipUpdateInput');
        zipInput.fill(zip);
        const applyButton = await this.page.locator('.a-button-input');
        applyButton.click();
        const doneButton = await this.page.locator('button[name="glowDoneButton"]');
        doneButton.click();
    }

    public async checkInvalidZipCode() {
        const message = (await this.page.locator('.a-box-inner.a-alert-container').textContent()).trim();
        expect(message).toBe('Please enter a valid US zip code')
    }

    public async chooseCountryByName(countryName: string) {
        await this.openDeliverBlock();
        await this.page.locator('select#GLUXCountryList').click();
        await this.page.selectOption('select#GLUXCountryList', { label: countryName });
        await this.page.waitForLoadState();
    }


}

const LOCATORS = {
    main_logo: '#nav-logo-sprites',
    tabs: '.tabs__item',
};

import { Locator, expect, test } from '@playwright/test';
import { Page, Selectors } from 'playwright';
import { ElementHandle } from '@playwright/test';

export default class Delivery {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async openDeliverBlock() {
        const deliverBlock = await this.page.locator(LOCATORS.deliver_block);
        deliverBlock.click();
        await this.page.waitForLoadState();
        const popup = await this.page.locator(LOCATORS.deliver_block_body);
        expect(popup).toBeVisible();
    }

    public async fillZIPinput(zip: string) {
        const zipInput = await this.page.locator('#GLUXZipUpdateInput');
        zipInput.fill(zip);
    }

    public async clickApplyZIP() {
        const applyButton = await this.page.locator('#GLUXZipUpdate');
        applyButton.click();
    }

    public async confirmationIsVisible() {
        const confirmationForUS = await this.page.locator('.a-popover-wrapper');
        await expect(confirmationForUS).toBeVisible();
    }

    public async clickContinueButton() {
        const continueButton = await this.page.locator('#GLUXConfirmClose');
        continueButton.click();
    }

    public async deliverToUSA(zip: string) {
        await this.openDeliverBlock();
        await this.fillZIPinput(zip);
        await this.clickApplyZIP();
        await this.page.waitForLoadState();
        await this.confirmationIsVisible();
        await this.clickContinueButton();
    }

    public async checkInvalidZipCodeError(error: string) {
        const message = (
            await this.page
                .locator('#GLUXZipError')
                .locator('.a-box.a-alert-inline.a-alert-inline-error')
                .locator('.a-box-inner.a-alert-container')
                .textContent()
        ).trim();
        expect(message).toContain(error);
    }

    public async chooseCountryByName(countryName: string) {
        await this.openDeliverBlock();
        await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState();
        await this.page.locator('.a-button-dropdown').click();
        await this.page
            .locator('.a-dropdown-item')
            .locator('.a-dropdown-link')
            .filter({ hasText: countryName })
            .first()
            .click();
        await this.page.getByRole('button', { name: 'Done' }).click();
        await this.page.waitForLoadState();
    }

    public async deliveryToSelected(destination: string) {
        const value = await this.page.locator('#glow-ingress-block').locator('#glow-ingress-line2').textContent();
        expect(value).toContain(destination);
    }
}

const LOCATORS = {
    deliver_block: '#glow-ingress-block',
    deliver_block_body: '.a-popover-wrapper',
};

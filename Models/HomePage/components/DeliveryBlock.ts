import { expect } from '@playwright/test';
import { Page } from 'playwright';

export default class Delivery {
    private readonly page: Page;
    private readonly locators = {
        deliverBlock: '#glow-ingress-block',
        deliverBlockBody: '.a-popover-wrapper',
        zipInput: '#GLUXZipUpdateInput',
        zipError: '#GLUXZipError',
        zipErrorMessage: '.a-box.a-alert-inline.a-alert-inline-error .a-box-inner.a-alert-container',
        countryDropdown: '.a-button-dropdown',
        countryOption: '.a-dropdown-item .a-dropdown-link',
        deliveryLocation: '#glow-ingress-line2'
    };

    constructor(page: Page) {
        this.page = page;
    }

    public async openDeliverBlock(): Promise<void> {
        const deliverBlock = this.page.locator(this.locators.deliverBlock);
        await deliverBlock.waitFor({ state: 'visible', timeout: 10000 });
        await expect(deliverBlock).toBeEnabled();
        await deliverBlock.click();
        await this.page.waitForLoadState();
        
        const popup = this.page.locator(this.locators.deliverBlockBody);
        await expect(popup).toBeVisible();
    }

    public async fillZIPinput(zip: string): Promise<void> {
        await this.page.locator(this.locators.zipInput).fill(zip);
    }

    public async clickApplyZIP(): Promise<void> {
        const applyButton = this.page.getByLabel('Apply');
        await applyButton.waitFor({ state: 'visible', timeout: 10000 });
        await expect(applyButton).toBeEnabled();
        await applyButton.click();
    }

    public async confirmationIsVisible(): Promise<void> {
        const confirmationForUS = this.page.locator(this.locators.deliverBlockBody);
        await expect(confirmationForUS).toBeVisible();
    }

    public async clickContinueButton(): Promise<void> {
        const continueButton = this.page.getByRole('button', { name: 'Continue' });
        await continueButton.waitFor({ state: 'visible', timeout: 10000 });
        await expect(continueButton).toBeEnabled();
        await continueButton.click();
    }

    public async deliverToUSA(zip: string): Promise<void> {
        await this.openDeliverBlock();
        await this.fillZIPinput(zip);
        await this.clickApplyZIP();
        await this.page.waitForLoadState();
        await this.confirmationIsVisible();
        await this.clickContinueButton();
    }

    public async checkInvalidZipCodeError(error: string): Promise<void> {
        const errorLocator = this.page.locator(this.locators.zipError)
            .locator(this.locators.zipErrorMessage);
        const message = await errorLocator.textContent();
        expect(message?.trim()).toContain(error);
    }

    public async chooseCountryByName(countryName: string): Promise<void> {
        await this.openDeliverBlock();
        await this.page.waitForLoadState();
        
        await this.page.locator(this.locators.countryDropdown).click();
        await this.page
            .locator(this.locators.countryOption)
            .filter({ hasText: countryName })
            .first()
            .click();
            
        await this.page.getByRole('button', { name: 'Done' }).click();
    }

    public async deliveryToSelected(destination: string): Promise<void> {
        const value = await this.page.locator(this.locators.deliveryLocation).textContent();
        expect(value).toContain(destination);
    }

    public async waitForRequestCompletionAddressChange(): Promise<void> {
        const requestUrl = 'https://www.amazon.com/portal-migration/hz/glow/address-change?actionSource=glow';
        
        const [response] = await Promise.all([
            this.page.waitForResponse(response => 
                response.url().includes(requestUrl) && response.status() === 200
            ),
            this.page.waitForRequest(request => request.url().includes(requestUrl))
        ]);
    }
}
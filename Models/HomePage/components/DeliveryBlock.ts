import { expect } from '@playwright/test';
import { Page } from 'playwright';

/**
 * Delivery class handles all delivery-related interactions on Amazon
 * including delivery location selection, ZIP code entry, and country selection.
 * 
 * This class encapsulates all delivery-related page objects and interactions
 * to provide a cleaner test implementation and better maintainability.
 */
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

  /**
     * Creates a new Delivery object
     * @param page - The Playwright Page object to interact with
     */
  constructor(page: Page) {
    this.page = page;
  }

  /**
     * Opens the delivery location selection dialog
     * @returns Promise that resolves when the delivery dialog is open and visible
     * @throws Error if the delivery block is not visible or not enabled
     */
  public async openDeliverBlock(): Promise<void> {
    const deliverBlock = this.page.locator(this.locators.deliverBlock);
    await deliverBlock.waitFor({ state: 'visible', timeout: 10000 });
    await expect(deliverBlock).toBeEnabled();
    await deliverBlock.click();
    await this.page.waitForLoadState();
        
    const popup = this.page.locator(this.locators.deliverBlockBody);
    await expect(popup).toBeVisible();
  }

  /**
     * Fills in the ZIP code input field
     * @param zip - The ZIP code to enter
     * @returns Promise that resolves when the ZIP code is entered
     */
  public async fillZIPinput(zip: string): Promise<void> {
    await this.page.locator(this.locators.zipInput).fill(zip);
  }

  /**
     * Clicks the Apply button to apply the entered ZIP code
     * @returns Promise that resolves when the Apply button is clicked
     * @throws Error if the Apply button is not visible or not enabled
     */
  public async clickApplyZIP(): Promise<void> {
    const applyButton = this.page.getByLabel('Apply');
    await applyButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(applyButton).toBeEnabled();
    await applyButton.click();
  }

  /**
     * Checks if the confirmation popup is visible after ZIP code is applied
     * @returns Promise that resolves when the confirmation is verified to be visible
     * @throws Error if the confirmation popup is not visible
     */
  public async confirmationIsVisible(): Promise<void> {
    const confirmationForUS = this.page.locator(this.locators.deliverBlockBody);
    await expect(confirmationForUS).toBeVisible();
  }

  /**
     * Clicks the Continue button in the delivery dialog
     * @returns Promise that resolves when the Continue button is clicked
     * @throws Error if the Continue button is not visible or not enabled
     */
  public async clickContinueButton(): Promise<void> {
    const continueButton = this.page.getByRole('button', { name: 'Continue' });
    await continueButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(continueButton).toBeEnabled();
    await continueButton.click();
  }

  /**
     * Clicks the Done button to complete the delivery location selection
     * @returns Promise that resolves when the Done button is clicked
     * @throws Error if the Done button is not visible or not enabled
     */
  public async clickDoneButton(): Promise<void> {
    const doneButton = this.page.getByRole('button', { name: 'Done' });
    await doneButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(doneButton).toBeEnabled();
    await doneButton.click();
  }

  /**
     * Complete workflow to set delivery location to a USA ZIP code
     * @param zip - The ZIP code to set as delivery location
     * @returns Promise that resolves when the delivery location is set
     */
  public async deliverToUSA(zip: string): Promise<void> {
    await this.openDeliverBlock();
    await this.fillZIPinput(zip);
    await this.clickApplyZIP();
    await this.page.waitForLoadState();
    await this.confirmationIsVisible();
    await this.clickContinueButton();
  }

  /**
     * Verifies that an invalid ZIP code error is displayed with the expected message
     * @param error - The expected error message
     * @returns Promise that resolves when the error message is verified
     * @throws Error if the error message doesn't contain the expected text
     */
  public async checkInvalidZipCodeError(error: string): Promise<void> {
    const errorLocator = this.page.locator(this.locators.zipError)
      .locator(this.locators.zipErrorMessage);
    const message = await errorLocator.textContent();
    expect(message?.trim()).toContain(error);
  }

  /**
     * Selects a country from the country dropdown
     * @param countryName - The name of the country to select
     * @returns Promise that resolves when the country is selected
     */
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

  /**
     * Verifies that the current delivery location matches the expected destination
     * @param destination - The expected delivery destination text
     * @returns Promise that resolves when the delivery location is verified
     * @throws Error if the delivery location doesn't contain the expected text
     */
  public async deliveryToSelected(destination: string): Promise<void> {
    const value = (await this.page.locator(this.locators.deliveryLocation).textContent()).trim();
    expect(value).toContain(destination);
  }

  /**
     * Waits for the address change request to complete
     * This is useful for ensuring the address change process is fully completed before proceeding
     * @returns Promise that resolves when the address change request is complete
     */
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
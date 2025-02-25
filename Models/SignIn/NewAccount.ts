import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { AlertType } from './AlertType';

export default class NewAccount {
    private readonly page: Page;
    private readonly locators = {
        userNameInput: '#ap_customer_name',
        emailInput: '#ap_email',
        passwordInput: '#ap_password',
        rePasswordInput: '#ap_password_check',
        alertMessage: '.a-alert-content'
    };

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Verifies that the create account page is opened
     */
    public async createAccountPageOpens(): Promise<void> {
        const body = await this.page.getByRole('heading', { name: 'Create account' });
        await expect(body).toBeVisible();
    }

    /**
     * Types the user's name into the input field
     * @param name - The name to enter
     */
    public async typeUserName(name: string): Promise<void> {
        const userInput = await this.page.locator(this.locators.userNameInput);
        await userInput.fill(name);
    }

    /**
     * Types the email into the email input field
     * @param email - The email to enter
     */
    public async typeEmail(email: string): Promise<void> {
        const emailInput = await this.page.locator(this.locators.emailInput);
        await emailInput.fill(email);
    }

    /**
     * Types the password into the password input field
     * @param pass - The password to enter
     */
    public async typePassword(pass: string): Promise<void> {
        const passwordInput = await this.page.locator(this.locators.passwordInput);
        await passwordInput.fill(pass);
    }

    /**
     * Types the re-enter password into the input field
     * @param pass - The password to re-enter
     */
    public async typeReEnterPassword(pass: string): Promise<void> {
        const rePassInput = await this.page.locator(this.locators.rePasswordInput);
        await rePassInput.fill(pass);
    }

    /**
     * Verifies that the alert message is displayed
     * @param alert - The expected alert message
     * @param alertType - The type of alert to check
     */
    public async alertIs(alert: string, alertType: AlertType): Promise<void> {
        const message = await this.page.locator(this.locators.alertMessage).nth(alertType).textContent();
        await expect(message).toContain(alert);
    }
}

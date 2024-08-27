import { Locator, expect, test } from '@playwright/test';
import { Page, Selectors } from 'playwright';
import { ElementHandle } from '@playwright/test';

export const enum AlertType {
    name = 0,
    email = 1,
    pass = 2,
    repass = 3,
}

export default class NewAccount {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async createAccountPageOpens() {
        const body = await this.page.getByRole('heading', { name: 'Create account' });
        await expect(body).toBeVisible();
    }

    public async typeUserName(name: string) {
        const userInput = await this.page.locator('#ap_customer_name');
        userInput.fill(name);
    }

    public async typeEmail(email: string) {
        const emailInput = await this.page.locator('#ap_email');
        emailInput.fill(email);
    }

    public async typePassword(pass: string) {
        const passwordInput = await this.page.locator('#ap_password');
        passwordInput.fill(pass);
    }

    public async typeReEnterPassword(pass: string) {
        const rePassInput = await this.page.locator('#ap_password_check');
        rePassInput.fill(pass);
    }

    public async alertIs(alert: string, alertType: AlertType) {
        const message = await this.page.locator('.a-alert-content').nth(alertType).textContent();
        await expect(message).toContain(alert);
    }
}

const LOCATORS = {};

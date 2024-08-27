import { Locator, expect, test } from '@playwright/test';
import { Page, Selectors } from 'playwright';
import { ElementHandle } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env', override: true });

export default class SignIn {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async signInPageOpens() {
        const body = await this.page.getByRole('heading', { name: 'Sign in' });
        await expect(body).toBeVisible();
    }

    public async typeEmail(email: string) {
        const emailInput = await this.page.locator('#ap_email');
        emailInput.fill(email);
    }

    public async typePassword(pass: string) {
        const passwordInput = await this.page.locator('#ap_password');
        passwordInput.fill(pass);
    }

    public async getSignInButton(): Promise<Locator> {
        return await this.page.locator('#signInSubmit');
    }

    public async getContinueButton(): Promise<Locator> {
        return await this.page.getByLabel('Continue');
    }

    public async errorBoxIsVisible(state: boolean) {
        const box = await this.page.locator('#auth-error-message-box');
        await expect(box).toBeVisible({ visible: state });
    }

    public async messageIs(message: string) {
        const text = await this.page.locator('.a-list-item').nth(0).textContent();
        await expect(text).toContain(message);
    }

    public async alertIs(alert: string) {
        const text = await this.page.locator('#auth-email-invalid-claim-alert .a-alert-content').textContent();

        await expect(text).toContain(alert);
    }

    public async getCreateNewAccountButton(): Promise<Locator> {
        return await this.page.locator('#createAccountSubmit');
    }

    public async getForgotPasswordButton(): Promise<Locator> {
        return await this.page.locator('#auth-fpp-link-bottom');
    }

    public async youHaveSuccessSignIn() {
        const name = process.env.NAME;
        const textValue = await this.page.locator('#nav-link-accountList-nav-line-1').textContent();
        expect(textValue).toContain(`Hello, ${name}`);
        console.log('You have successfully Signed In');
    }
}

const LOCATORS = {};

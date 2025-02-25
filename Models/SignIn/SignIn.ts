import { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import HomePage from '../HomePage/HomePage';
import Utils from '../Utils/Utils';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env', override: true });

export default class SignIn {
    private readonly page: Page;
    private readonly locators = {
        email: '#ap_email',
        pass: '#ap_password',
        signinButton: '#signInSubmit',
        errorMessage: '#auth-error-message-box',
        errorMessageText: '.a-list-item',
        alertText: '#auth-email-invalid-claim-alert .a-alert-content',
        createAccountButton: '#createAccountSubmit',
        forgetPassButton: '#auth-fpp-link-bottom',
        signedInText: '#nav-link-accountList-nav-line-1',
        accountList: '#nav-link-accountList'
    };

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Hover over the account list
     */
    public async hoverOverAccountList(): Promise<void> {
        const accountList = await this.page.locator(this.locators.accountList);
        await accountList.hover();
    }

    /**
     * Verifies that sign in page is opened
     */
    public async signInPageOpens(): Promise<void> {
        const body = await this.page.getByRole('heading', { name: 'Sign in' });
        await expect(body).toBeVisible();
    }

    /**
     * Types email into email input field
     * @param email - Email to enter
     */
    public async typeEmail(email: string): Promise<void> {
        const emailInput = await this.page.locator(this.locators.email);
        await emailInput.fill(email);
    }

    /**
     * Types password into password input field
     * @param pass - Password to enter
     */
    public async typePassword(pass: string): Promise<void> {
        const passwordInput = await this.page.locator(this.locators.pass);
        await passwordInput.fill(pass);
    }

    /**
     * Gets the sign in button locator
     */
    public async clickSignInButton(): Promise<void> {
        await this.page.locator(this.locators.signinButton).click();
    }

    /**
     * Gets the continue button locator
     */
    public async clickContinueButton(): Promise<void> {
        await this.page.getByLabel('Continue').click();
    }

    /**
     * Verifies error box visibility
     * @param state - Expected visibility state
     */
    public async errorBoxIsVisible(state: boolean): Promise<void> {
        const box = await this.page.locator(this.locators.errorMessage);
        await expect(box).toBeVisible({ visible: state });
    }

    /**
     * Verifies error message text
     * @param message - Expected error message
     */
    public async messageIs(message: string): Promise<void> {
        const text = await this.page.locator(this.locators.errorMessageText).nth(0).textContent();
        await expect(text).toContain(message);
    }

    /**
     * Verifies alert text
     * @param alert - Expected alert text
     */
    public async alertIs(alert: string): Promise<void> {
        const text = await this.page.locator(this.locators.alertText).textContent();
        await expect(text).toContain(alert);
    }

    /**
     * Gets the create new account button locator
     */
    public async clickCreateNewAccountButton(): Promise<void> {
        await this.page.locator(this.locators.createAccountButton).click();
    }

    /**
     * Gets the forgot password button locator
     */
    public async clickForgotPasswordButton(): Promise<void> {
        await this.page.locator(this.locators.forgetPassButton).click();
    }

    /**
     * Verifies successful sign in
     */
    public async youHaveSuccessSignIn(): Promise<void> {
        const name = process.env.NAME;
        const textValue = await this.page.locator(this.locators.signedInText).textContent();
        expect(textValue).toContain(`Hello, ${name}`);
        console.log('You have successfully Signed In');
    }

    /**
     * Performs sign in using environment credentials
     */
    public async signInViaCredentials(): Promise<void> {
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;
        const utils = new Utils(this.page);
        const homepage = new HomePage(this.page);
        await utils.checkPageURL('amazon');
        await this.hoverOverAccountList();
        await homepage.clickSignInButton();
        await this.signInPageOpens();
        await this.typeEmail(username);
        await this.clickContinueButton();
        await this.typePassword(password);
        await this.clickSignInButton();
        await this.page.waitForLoadState();
        await this.youHaveSuccessSignIn();
    }
}
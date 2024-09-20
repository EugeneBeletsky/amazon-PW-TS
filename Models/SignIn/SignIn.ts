import { Locator, expect, test } from '@playwright/test';
import { Page, Selectors } from 'playwright';
import { ElementHandle } from '@playwright/test';
import HomePage from '../../Models/HomePage/HomePage';
import Utils from '../../Models/Utils/Utils';
import Captcha from '../../Models/Captcha/Captcha';
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
        const emailInput = await this.page.locator(LOCATORS.email);
        emailInput.fill(email);
    }

    public async typePassword(pass: string) {
        const passwordInput = await this.page.locator(LOCATORS.pass);
        passwordInput.fill(pass);
    }

    public async getSignInButton(): Promise<Locator> {
        return await this.page.locator(LOCATORS.signin_button);
    }

    public async getContinueButton(): Promise<Locator> {
        return await this.page.getByLabel('Continue');
    }

    public async errorBoxIsVisible(state: boolean) {
        const box = await this.page.locator(LOCATORS.error_message);
        await expect(box).toBeVisible({ visible: state });
    }

    public async messageIs(message: string) {
        const text = await this.page.locator(LOCATORS.error_message_text).nth(0).textContent();
        await expect(text).toContain(message);
    }

    public async alertIs(alert: string) {
        const text = await this.page.locator(LOCATORS.alert_text).textContent();

        await expect(text).toContain(alert);
    }

    public async getCreateNewAccountButton(): Promise<Locator> {
        return await this.page.locator(LOCATORS.createAccount_button);
    }

    public async getForgotPasswordButton(): Promise<Locator> {
        return await this.page.locator(LOCATORS.forgetPass_button);
    }

    public async youHaveSuccessSignIn() {
        const name = process.env.NAME;
        const textValue = await this.page.locator(LOCATORS.signedIn_text).textContent();
        expect(textValue).toContain(`Hello, ${name}`);
        console.log('You have successfully Signed In');
    }

    public async signInViaCredentials() {
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;
        let captcha = new Captcha(this.page);
        let utils = new Utils(this.page);
        let homepage = new HomePage(this.page);
        let signin = new SignIn(this.page);
        await captcha.checkCaptchaAndPauseIfPresent();
        await utils.checkPageURL('amazon');

        // if(!((await homepage.getSignInButton()).isVisible())) {
        //     await this.page.locator('#nav-link-accountList').hover()
        // }

        await this.page.locator('#nav-link-accountList').hover();

        await utils.clickOnButton(await homepage.getSignInButton());
        await signin.signInPageOpens();
        await signin.typeEmail(username);
        await utils.clickOnButton(await signin.getContinueButton());
        await signin.typePassword(password);
        await utils.clickOnButton(await signin.getSignInButton());
        await this.page.waitForLoadState();
        await signin.youHaveSuccessSignIn();
    }
}

const LOCATORS = {
    email: '#ap_email',
    pass: '#ap_password',
    signin_button: '#signInSubmit',
    error_message: '#auth-error-message-box',
    error_message_text: '.a-list-item',
    alert_text: '#auth-email-invalid-claim-alert .a-alert-content',
    createAccount_button: '#createAccountSubmit',
    forgetPass_button: '#auth-fpp-link-bottom',
    signedIn_text: '#nav-link-accountList-nav-line-1',
};

import { Page, Locator, expect, test } from '@playwright/test';
import * as dotenv from 'dotenv';
import { chromium } from '@playwright/test';
import Captcha from '../Captcha/Captcha';
dotenv.config({ path: '.env', override: true });

export default class Utils {
  private readonly page: Page;
  private readonly baseURL: string;

  // Constants for random data generation
  private static readonly CHARS = {
    UPPER: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    LOWER: 'abcdefghijklmnopqrstuvwxyz',
    NUMBERS: '0123456789',
    SYMBOLS: '!@#$%^&*()-_=+[]{}|;:,.<>/?'
  };

  private static readonly TEST_DATA = {
    FIRST_NAMES: [
      'Liam', 'Ella', 'Jackson', 'Ava', 'Oliver',
      'Sophia', 'Henry', 'Isabella', 'William', 'Charlotte',
      'James', 'Amelia', 'Benjamin', 'Emma', 'Samuel',
      'Mia', 'Alexander', 'Grace', 'Daniel', 'Lily'
    ],
    LAST_NAMES: [
      'Hill', 'Hopkins', 'Nelson', 'Perez', 'Webster',
      'Hoffman', 'Diaz', 'Campbell', 'Stones', 'Grealish',
      'Kane', 'Drinkwater', 'Pickford', 'Walker', 'Lampard',
      'Gerard', 'Terry', 'Cole', 'Neville', 'Hart'
    ]
  };

  constructor(page: Page) {
    this.page = page;
    this.baseURL = process.env.BASE_URL;
  }

  // Navigation methods
  public async navigateTo(url: string): Promise<void> {
    const captcha = new Captcha(this.page);
    await this.page.goto(url, { waitUntil: 'load' });
    await captcha.handleCaptchaIfPresent();
  }

  public async navigateToBaseURL(): Promise<void> {
    await this.navigateTo(this.baseURL);
  }

  public async checkPageURL(expectedUrl: string): Promise<void> {
    const currentURL = await this.page.url();
    await expect(currentURL).toContain(expectedUrl);
  }

  // UI interaction methods
  public async clickOnButton(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  // Random data generation methods
  public async generateRandomName(): Promise<string> {
    const firstName = this.getRandomElement(Utils.TEST_DATA.FIRST_NAMES);
    const lastName = this.getRandomElement(Utils.TEST_DATA.LAST_NAMES);
    return `${firstName} ${lastName}`;
  }

  public async generateRandomPassword(length: number = 10): Promise<string> {
    const allChars = Object.values(Utils.CHARS).join('');
    return this.generateRandomString(allChars, length);
  }

  public async generateRandomEmail(length: number = 10): Promise<string> {
    const allowedChars = Utils.CHARS.UPPER + Utils.CHARS.LOWER + Utils.CHARS.NUMBERS;
    const randomString = this.generateRandomString(allowedChars, length);
    return `${randomString}@gmail.com`;
  }

  // Private helper methods
  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private generateRandomString(characters: string, length: number): string {
    return Array.from({ length }, () => 
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }
}

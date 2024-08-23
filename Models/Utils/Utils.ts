import { Page, Locator, expect, test } from "@playwright/test";

export default class Utils {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }  

    public async navigateTo(url:string) {
        await this.page.goto(`${url}`, { waitUntil: 'load' })
    }

    public async checkPageURL(url:string) {
        const currentURL = await this.page.url();
        await expect(currentURL).toContain(url)
    }

    public async cliclOnButton(locator:Locator): Promise <void> {
        await locator.waitFor();
        await locator.click();
    }

    private firstNames = [
      "Liam", "Ella", "Jackson", "Ava", "Oliver", "Sophia", "Henry", "Isabella", "William", "Charlotte",
      "James", "Amelia", "Benjamin", "Emma", "Samuel", "Mia", "Alexander", "Grace", "Daniel", "Lily"
    ];
  
    private lastNames = [
      'Hill', 'Hopkins', 'Nelson', 'Perez', 'Webster', 'Hoffman', 'Diaz', 'Campbell', 'Stones', 'Grealish',
      'Kane', 'Drinkwater', 'Pickford', 'Walker', 'Lampard', 'Gerard', 'Terry', 'Cole', 'Neville', 'Hart'
    ];
  
    public async generateRandomName(): Promise <string> {
      const randomFirstName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
      const randomLastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
      return `${randomFirstName} ${randomLastName}`;
    }

    public async generateRandomPassword(length: number = 10): Promise <string> {
      const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const numberChars = '0123456789';
      const symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>/?';      
      const allChars = upperCaseChars + lowerCaseChars + numberChars + symbolChars;
      let randomString = '';  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        randomString += allChars[randomIndex];
      }  
      return randomString;
    }

    public async generateRandomEmail(length: number = 10): Promise <string> {
      const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const numberChars = '0123456789';    
      const allChars = upperCaseChars + lowerCaseChars + numberChars;
      let randomString = '';  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        randomString += allChars[randomIndex];
      }  
      return `randomString + '@gmail.com'`;
    }
}
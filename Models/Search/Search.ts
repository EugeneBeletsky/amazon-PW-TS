import { Locator, expect, test } from '@playwright/test';
import { Page, Selectors } from 'playwright';
import { ElementHandle } from '@playwright/test';
import HomePage from '../../Models/HomePage/HomePage';
import Utils from '../../Models/Utils/Utils';
import Captcha from '../../Models/Captcha/Captcha';
import * as dotenv from 'dotenv';

type SortOptions = 
    | 'relevanceblender'    // Featured
    | 'price-asc-rank'      // Price: Low to High
    | 'price-desc-rank'     // Price: High to Low
    | 'review-rank'         // Avg. Customer Review
    | 'date-desc-rank'      // Newest Arrivals
    | 'exact-aware-popularity-rank';  // Best Sellers

export default class Search {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async searchType(value:string) {
        const search = await this.page.locator(LOCATORS.input);
        search.fill(value);
    }

    public async submitSearch() {
        await this.page.locator(LOCATORS.submit_input).click();
    }

    public async clickCategory() {
        await this.page.locator(LOCATORS.category_button).click();
    }

    public async pickCategory(category:string) {
        await this.page.locator(LOCATORS.category_button).locator('select option').filter({hasText:category}).click();
    }

    public async changeCategory(category:string) {
        await this.clickCategory();
        await this.pickCategory(category);
    }

    public async searchItem(item:string, category?:string) {
        if(category) {
            await this.changeCategory(category);
        }        
        await this.searchType(item);
        await this.submitSearch();
    }

    public async thereAreItemsFound(resultsText: string, searchTerm: string) {
        const resultsDiv = await this.page.locator('.a-section.a-spacing-small.a-spacing-top-small');
        const resultsTextElement = (await resultsDiv.locator('span').nth(0).textContent()).trim();        
        expect(resultsTextElement).toContain(resultsText);
        const searchTermElement = resultsDiv.locator('.a-color-state.a-text-bold');
        const actualSearchTerm = (await searchTermElement.textContent()).trim();
        expect(actualSearchTerm).toBe(`"${searchTerm}"`);
    }

    public async sortByOption(sortValue: SortOptions) {
        const sortDropdown = this.page.locator('#s-result-sort-select');
        await sortDropdown.selectOption(sortValue);
        await this.page.waitForLoadState('networkidle');
    }


}

const LOCATORS = {
    input: '#twotabsearchtextbox',
    submit_input: '#nav-search-submit-button',
    category_button: '#searchDropdownBox'
    
};

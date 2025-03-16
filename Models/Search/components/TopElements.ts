import { Page, Locator, expect, test } from '@playwright/test';

export type SortOptions =
    | 'relevanceblender' // Featured
    | 'price-asc-rank' // Price: Low to High
    | 'price-desc-rank' // Price: High to Low
    | 'review-rank' // Avg. Customer Review
    | 'date-desc-rank' // Newest Arrivals
    | 'exact-aware-popularity-rank'; // Best Sellers

export default class TopElements {
    private readonly page: Page;
    private readonly locators = {
        input: '#twotabsearchtextbox',
        submit_input: '#nav-search-submit-button',
        category_button: '#searchDropdownBox',
    };

    constructor(page: Page) {
        this.page = page;
    }

    public async thereAreItemsCountFound(resultsCount: number): Promise<void> {
        const resultsDiv = await this.page.locator('.rush-component').filter({ has: this.page.locator('span') });
        const resultsTextElement = (await resultsDiv.textContent()).trim().split(' ')[2];
        const count = parseInt(resultsTextElement);
        expect(count).toBe(resultsCount);        
    }

    public async thereAreItemsFoundFor(searchTerm: string): Promise<void> {
        const resultsDiv = await this.page.locator('.a-section.a-spacing-small.a-spacing-top-small');
        const searchTermElement = resultsDiv.locator('.a-color-state.a-text-bold');
        const actualSearchTerm = (await searchTermElement.textContent()).trim();
        expect(actualSearchTerm).toBe(`"${searchTerm}"`);
    }

    public async sortByOption(sortValue: SortOptions): Promise<void> {
        const sortDropdown = this.page.locator('#s-result-sort-select');
        await sortDropdown.selectOption(sortValue);
        await this.page.waitForLoadState('networkidle');
    }
}

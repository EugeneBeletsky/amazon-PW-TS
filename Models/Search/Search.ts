import { Page } from 'playwright';
import SearchBox from './components/SearchBox';
import TopElements from './components/TopElements';
import * as dotenv from 'dotenv';
import { SortOptions } from './components/TopElements';

dotenv.config({ path: '.env', override: true });

export default class Search {
    private readonly page: Page;
    public readonly searchBox: SearchBox;
    public readonly topElements: TopElements;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = new SearchBox(page);
        this.topElements = new TopElements(page);
    }

    /**
     * Performs a search with optional category selection
     * @param searchTerm - The term to search for
     * @param category - Optional category to search within
     */
    public async performSearch(searchTerm: string, category?: string): Promise<void> {
        await this.searchBox.searchItem(searchTerm, category);
    }

    /**
     * Verifies search results contain expected count of results
     * @param resultsCount - Expected count of results
     */
    public async verifySearchResultsCount(resultsCount: number): Promise<void> {
        await this.topElements.thereAreItemsCountFound(resultsCount);
    }

    /**
     * Verifies search results contain expected search term
     * @param searchTerm - Search term that should appear in results
     */
    public async verifySearchResults(searchTerm: string): Promise<void> {
        await this.topElements.thereAreItemsFoundFor(searchTerm);
    }

    /**
     * Sorts search results by the specified option
     * @param sortOption - Option to sort by
     */
    public async sortResults(sortOption: SortOptions): Promise<void> {
        await this.topElements.sortByOption(sortOption);
    }
}

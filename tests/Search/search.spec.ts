import { test, expect, Page } from '@playwright/test';
import HomePage from '../../Models/HomePage/HomePage';
import Utils from '../../Models/Utils/Utils';
import Captcha from '../../Models/Captcha/Captcha';
import SignIn from '../../Models/SignIn/SignIn';
import Search from '../../Models/Search/Search';

let page: Page;
let utils: Utils;
let captcha: Captcha;
let homepage: HomePage;
let signin: SignIn;
let search: Search;

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    utils = new Utils(page);
    captcha = new Captcha(page);
    homepage = new HomePage(page);
    signin = new SignIn(page);
    search = new Search(page);
    await utils.navigateToBaseURL();
});

test.setTimeout(60 * 1000);

test('Search for item', async () => {
    await captcha.handleCaptchaIfPresent();
    await signin.signInViaCredentials();
    await search.performSearch('Iphone');
    await search.verifySearchResults('Iphone');
    // await search.verifySearchResultsCount(19);
    await search.sortResults('price-desc-rank');  
});

import { test, expect } from '@playwright/test';
import HomePage from '../../Models/HomePage/HomePage';
import Utils from '../../Models/Utils/Utils';
import Captcha from '../../Models/Captcha/Captcha';
import SignIn from '../../Models/SignIn/SignIn';
import Search from '../../Models/Search/Search';



test.beforeEach(async ({ page }) => {
    let utils = new Utils(page);
    await utils.navigateToBaseURL();
});

test('Search for item', async ({ page }) => {
    test.setTimeout(30000);
    let captcha = new Captcha(page);
    let utils = new Utils(page);
    let homepage = new HomePage(page);
    let signin = new SignIn(page);
    let search = new Search(page);
    await signin.signInViaCredentials();

    await homepage.chooseCountryByName('Japan');


    await search.searchItem('Iphone');
    // await search.thereAreItemsFound('23 results', 'Iphone');
    // await search.sortByOption('price-desc-rank');
});



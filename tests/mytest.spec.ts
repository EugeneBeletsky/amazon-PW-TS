import {test, expect} from '@playwright/test';
import HomePage from '../Models/HomePage/HomePage';
import Utils from '../Models/Utils/Utils';


test.beforeEach(async ({ page }) => {

});

test('My first test amazon', async ({ page}) => {
    test.setTimeout(180000)
    let utils = new Utils(page)
    await utils.navigateTo("https://www.amazon.com/ref=nav_logo")

    await utils.checkPageURL("amazon")
    await utils.cliclOnButton("#nav-logo-sprites")

    await utils.checkPageURL("amazon")    

    // await page.goto("https://www.amazon.com/ref=nav_logo")


});
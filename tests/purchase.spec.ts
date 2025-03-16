import { test, expect, Page } from '@playwright/test';
import HomePage from '../Models/HomePage/HomePage';
import Utils from '../Models/Utils/Utils';
import Captcha from '../Models/Captcha/Captcha';
import SignIn from '../Models/SignIn/SignIn';
import Search from '../Models/Search/Search';
import Delivery from '../Models/HomePage/components/DeliveryBlock';

let page: Page;
let utils: Utils;
let captcha: Captcha;
let homepage: HomePage;
let signin: SignIn;
let search: Search;
let delivery: Delivery;

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    utils = new Utils(page);
    captcha = new Captcha(page);
    homepage = new HomePage(page);
    signin = new SignIn(page);
    search = new Search(page);
    delivery = new Delivery(page);
    await utils.navigateToBaseURL();
});

test.setTimeout(60 * 1000);

test('Purchase item', async () => {
    await captcha.handleCaptchaIfPresent();
    await signin.signInViaCredentials();

    if( (await page.locator('#glow-ingress-line2').textContent()).trim() !== 'New York 10001') {
        await delivery.openDeliverBlock();
        await delivery.fillZIPinput('10001');
        await delivery.clickApplyZIP();
        await page.waitForLoadState();        
        await delivery.clickDoneButton();
        
    }
    // await delivery.deliverToUSA('10001');
    await page.waitForLoadState('networkidle');
    await delivery.deliveryToSelected('New York 10001');

    await page.getByLabel('Open All Categories Menu').click();
    await page.getByRole('link', { name: 'Echo & Alexa' }).click();
    // await page.locator('.hmenu-item').filter({ hasText: 'Echo & Alexa' }).first().click();
    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: 'Echo Hub', exact: true }).first().click();
    // await page.locator('.hmenu-item').filter({ hasText: 'Echo Hub' }).first().click();
    await page.locator('#add-to-cart-button').click();
    // await page.locator('.a-button-input').filter({ hasText: 'No thanks' }).click();
    
    await page.waitForTimeout(3000);
    // await expect(page.locator('#productTitle')).toBeVisible();
    // await expect(page.locator('#productTitle')).toContainText('Amazon Echo Hub');
    // await expect(page.getByRole('button', { name: 'Add to cart', exact: true })).toBeVisible();
    // await expect(page.getByLabel('Buy Now')).toBeVisible();
    // await expect(page.locator('#newAccordionRow_0')).toContainText('$179.99');
    // await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
    // await page.getByRole('button', { name: 'Submit' }).click();
    // await expect(page.getByText('Added to cart Configuration:')).toBeVisible();
    // await expect(page.locator('#NATC_SMART_WAGON_CONF_MSG_SUCCESS')).toContainText('Added to cart');



    if(await page.locator('#a-popover-4').isVisible()) {
        await page.locator('.a-button-close').click();
    }

    // await expect(page.getByLabel('items in cart')).toBeVisible();
    await expect(page.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' })).toBeVisible();
    await page.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' }).click();
    // await page.getByLabel('Decrease quantity by one').click();
    await expect(page.getByLabel('Shopping Cart', { exact: true }).getByRole('listitem').first()).toBeVisible();
    await expect(page.locator('h4')).toContainText('Amazon Echo Hub');
    // await page.goto('https://www.amazon.com/checkout/p/p-106-2276885-9406631/address?pipelineType=Chewbacca&referrer=address');
    // await expect(page.getByTestId('secondary-continue-button')).toBeVisible();

    await expect(page.getByLabel('Proceed to checkout Check out')).toBeVisible();
    await page.getByLabel('Proceed to checkout Check out').click();

    await expect(page.locator('#checkout-secondary-continue-button-id').filter({ hasText: 'Deliver to this address' })).toBeVisible();
    
    
    
});

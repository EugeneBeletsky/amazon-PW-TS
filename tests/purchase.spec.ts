import { test, expect, Page } from '@playwright/test';
import HomePage from '../Models/HomePage/HomePage';
import Utils from '../Models/Utils/Utils';
import Captcha from '../Models/Captcha/Captcha';
import SignIn from '../Models/SignIn/SignIn';
import Search from '../Models/Search/Search';
import Delivery from '../Models/HomePage/components/DeliveryBlock';
import MainMenu from '../Models/SideBar/components/MainMenu';

let page: Page;
let utils: Utils;
let captcha: Captcha;
let homepage: HomePage;
let signin: SignIn;
let search: Search;
let delivery: Delivery;
let mainMenu: MainMenu;

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    utils = new Utils(page);
    captcha = new Captcha(page);
    homepage = new HomePage(page);
    signin = new SignIn(page);
    search = new Search(page);
    delivery = new Delivery(page);
    mainMenu = new MainMenu(page);
    await utils.navigateToBaseURL();
});

test.setTimeout(60 * 1000);

test('Purchase item', async () => {
    await captcha.handleCaptchaIfPresent();
    await signin.signInViaCredentials();

    // if( (await page.locator('#glow-ingress-line2').textContent()).trim() !== 'New York 10001') {
    //     await delivery.openDeliverBlock();
    //     await delivery.fillZIPinput('10001');
    //     await delivery.clickApplyZIP();
    //     await page.waitForLoadState();        
    //     await delivery.clickDoneButton();
        
    // }
    // await delivery.deliverToUSA('10001');
    await page.waitForTimeout(2000);
    await delivery.deliveryToSelected('New York 10013');

    await mainMenu.openMainMenu();
    await expect(await mainMenu.isMainMenuVisible()).toBe(true);
    await expect(await mainMenu.isMenuItemVisible('Echo & Alexa')).toBe(true);
    await mainMenu.clickMenuItem('Echo & Alexa')
    await page.waitForTimeout(1000);
    await expect(await mainMenu.isSubmenuItemVisible('Echo Hub')).toBe(true);
    await mainMenu.clickSubmenuItem('Echo Hub')
    await page.waitForTimeout(1000);


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
    
    








    await page.goto('https://www.amazon.com/');
    await page.getByRole('link', { name: 'Sign in', exact: true }).click();
    await page.getByLabel('Email or mobile phone number').fill('eugenebeletsky@gmail.com');
    await page.getByLabel('Continue').click();
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Amazon_2024');
    await page.getByLabel('Sign in').click();
    await page.getByLabel('Open All Categories Menu').click();
    await page.getByRole('link', { name: 'Echo & Alexa' }).click();
    await page.getByRole('link', { name: 'Echo Hub' }).click();
    await expect(page.locator('#main-image-container').getByRole('img')).toBeVisible();
    await expect(page.locator('#productTitle')).toContainText('Amazon Echo Hub | 8” smart home control panel with Alexa | Compatible with thousands of devices');
    await expect(page.locator('#centerCol')).toBeVisible();
    await expect(page.locator('#leftCol')).toBeVisible();
    await expect(page.locator('#rightCol')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart', exact: true })).toBeVisible();
    await expect(page.getByLabel('Buy Now')).toBeVisible();
    await expect(page.locator('#newAccordionRow_0')).toContainText('$129.99');
    await expect(page.locator('#acrCustomerReviewLink')).toBeVisible();
    await expect(page.locator('#acrCustomerReviewText')).toContainText('(944)');
    await expect(page.getByRole('button', { name: '4.0 out of 5 stars' })).toBeVisible();
    await page.locator('#a-autoid-0-announce').click();
    await page.getByLabel('2', { exact: true }).getByText('2').click();
    await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
    await page.getByRole('button', { name: 'Close' }).click();

















    await expect(page.locator('#sw-subtotal')).toContainText('Cart Subtotal: $259.98$259.98');
    await expect(page.getByRole('heading', { name: 'Added to cart' })).toBeVisible();
    await expect(page.locator('#NATC_SMART_WAGON_CONF_MSG_SUCCESS')).toContainText('Added to cart');
    await expect(page.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' })).toBeVisible();
    await expect(page.getByLabel('Proceed to checkout (2 items')).toBeVisible();
    await page.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' }).click();













    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
    await expect(page.locator('h4')).toContainText('Amazon Echo Hub | 8” smart home control panel with Alexa | Compatible with thousands of devices');
    await expect(page.locator('#sc-subtotal-amount-activecart')).toContainText('$259.98');
    await expect(page.locator('#sc-subtotal-amount-activecart')).toContainText('$259.98');
    
});

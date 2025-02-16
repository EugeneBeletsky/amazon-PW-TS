import { test, expect } from '@playwright/test';
import Delivery from '../../Models/HomePage/components/DeliveryBlock';
import SignIn from '../../Models/SignIn/SignIn';
import Utils from '../../Models/Utils/Utils';

test.beforeEach(async ({ page }) => {
    const utils = new Utils(page);
    await utils.navigateToBaseURL();
});

test.setTimeout(60000);

type DeliveryTestCase = {
    zipCode: string;
    expectedLocation: string;
};

type CountryTestCase = {
    countryName: string;
    expectedLocation: string;
};

const countryTestCases: CountryTestCase[] = [
    { countryName: 'Canada', expectedLocation: 'Canada' },
    { countryName: 'United Kingdom', expectedLocation: 'United Kingdom' },
    { countryName: 'Australia', expectedLocation: 'Australia' },
];

const usDeliveryTestCases: DeliveryTestCase[] = [
    { zipCode: '10001', expectedLocation: 'New York 10001' },
    { zipCode: '90210', expectedLocation: 'Beverly H... 90210' },
    { zipCode: '99501', expectedLocation: 'Anchorage 99501' },
    { zipCode: '32386', expectedLocation: 'Please enter a valid US zip code' },
];

test.describe('Delivery Tests: Only to USA', () => {
    usDeliveryTestCases.forEach(({ zipCode, expectedLocation }) => {
        if (zipCode !== '32386') {
            test(`Deliver to USA: ${zipCode}`, async ({ page }) => {
                console.log(`Choosing ZIP code: ${zipCode}`);
                const delivery = new Delivery(page);
                if( !await page.locator('#glow-ingress-block').isVisible()) {
                    await page.locator('#nav-logo').click();
                }
                await delivery.deliverToUSA(zipCode);
                await page.waitForLoadState('networkidle');
                console.log(`Delivery selected: ${expectedLocation}`);
                await delivery.deliveryToSelected(expectedLocation);
            });
        } else {
            test(`Deliver to USA: invalid ZIP CODE ${zipCode}`, async ({ page }) => {
                console.log(`Choosing invalid ZIP code: ${zipCode}`);
                const delivery = new Delivery(page);
                if( !await page.locator('#glow-ingress-block').isVisible()) {
                    await page.locator('#nav-logo').click();
                }
                await delivery.openDeliverBlock();
                await delivery.fillZIPinput(zipCode);
                await delivery.clickApplyZIP();
                await page.waitForSelector('#GLUXZipError', { timeout: 10000 });
                console.log(`Checking error message: ${expectedLocation}`);
                await delivery.checkInvalidZipCodeError(expectedLocation);
            });
        }
    });
});

test.describe('Delivery Tests: Other Countries', () => {
    countryTestCases.forEach(({ countryName, expectedLocation }) => {
        test(`Deliver to other countries: ${countryName}`, async ({ page }) => {
            console.log(`Choosing country: ${countryName}`);
            const delivery = new Delivery(page);
            if( !await page.locator('#glow-ingress-block').isVisible()) {
                await page.locator('#nav-logo').click();
            }
            await delivery.chooseCountryByName(countryName);
            await page.waitForLoadState('networkidle');            
            console.log(`Delivery selected: ${expectedLocation}`);
            await delivery.deliveryToSelected(expectedLocation);
        });
    });
});


test.describe('Delivery Tests: Change Delivery from One Country to Another', () => {
    test('Change delivery from Germany to Belarus to Argentina', async ({ page }) => {
        console.log('Changing delivery from Germany to Belarus to Argentina');
        const delivery = new Delivery(page);
        if( !await page.locator('#glow-ingress-block').isVisible()) {
            await page.locator('#nav-logo').click();
        }
        await delivery.chooseCountryByName('Germany');
        await page.waitForLoadState('networkidle');
        console.log('Delivery selected: Germany');
        await delivery.deliveryToSelected('Germany');
        await delivery.chooseCountryByName('Belarus');
        await page.waitForLoadState('networkidle'); 
        console.log('Delivery selected: Belarus');               
        await delivery.deliveryToSelected('Belarus');
        await delivery.chooseCountryByName('Argentina');
        await page.waitForLoadState('networkidle');
        console.log('Delivery selected: Argentina');
        await delivery.deliveryToSelected('Argentina');
    });
});

test.describe('Delivery Tests: Change Delivery from Country to USA', () => {
    countryTestCases.forEach(({ countryName }) => {
        test(`Change delivery from ${countryName} to USA: New York 10001`, async ({ page }) => {
            console.log(`Changing delivery from ${countryName} to USA: New York 10001`);
            const delivery = new Delivery(page);
            if( !await page.locator('#glow-ingress-block').isVisible()) {
                await page.locator('#nav-logo').click();
            }
            await delivery.chooseCountryByName(countryName);
            await page.waitForLoadState('networkidle');
            console.log(`Delivery selected: ${countryName}`);
            await delivery.deliveryToSelected(countryName);
            await delivery.deliverToUSA('10001');
            await page.waitForLoadState('networkidle');
            console.log('Delivery selected: New York 10001');
            await delivery.deliveryToSelected('New York 10001');
        });
    });
});

test.describe('Delivery Tests: Change Delivery from USA to Country', () => {
    usDeliveryTestCases.forEach(({ zipCode }) => {
        countryTestCases.forEach(({ countryName, expectedLocation }) => {
            test(`Change delivery from USA: ${zipCode} to ${countryName}`, async ({ page }) => {
                console.log(`Changing delivery from USA: ${zipCode} to ${countryName}`);
                const delivery = new Delivery(page);
                await delivery.deliverToUSA(zipCode);
                await page.waitForLoadState('networkidle');
                console.log('Delivery selected: New York 10001');
                await delivery.deliveryToSelected('New York 10001');
                await delivery.chooseCountryByName(countryName);
                await delivery.waitForRequestCompletionAddressChange();

                console.log(`Delivery selected: ${expectedLocation}`);
                await delivery.deliveryToSelected(expectedLocation);
            });
        });
    });
});
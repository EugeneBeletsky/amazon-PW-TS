import { Page, expect, Locator } from '@playwright/test';

/**
 * Class representing the main sidebar menu of Amazon
 */
export default class MainMenu {
    private readonly page: Page;
    private readonly locators = {
        menuContainer: '#hmenu-content',
        mainMenu: 'ul.hmenu.hmenu-visible[data-menu-id="1"]',
        subMenu: 'ul.hmenu.hmenu-translateX-right',
        menuItems: 'a.hmenu-item',
        backButton: '.hmenu-back-button',
        menuTitle: '.hmenu-title',
        seeAllButton: '.hmenu-compressed-btn',
        seeLessButton: '.hmenu-expanded-btn',
        menuSeparator: '.hmenu-separator',
        subMenuWithId: (id: string) => `ul.hmenu[data-menu-id="${id}"]`,
        menuItemWithText: (text: string) => `//a[contains(@class, "hmenu-item") and contains(text(), "${text}")]`,
        menuItemWithSubmenu: (id: string) => `a.hmenu-item[data-menu-id="${id}"]`
    };

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Opens the main menu (if it's not already open)
     */
    public async openMainMenu(): Promise<void> {
        // Check if menu is already open
        const menuVisible = await this.page.locator(this.locators.menuContainer).isVisible();
        if (!menuVisible) {
            // Click on hamburger menu to open it
            await this.page.locator('#nav-hamburger-menu').click();
            await this.page.waitForSelector(this.locators.menuContainer, { state: 'visible' });
        }
    }

    /**
     * Check main menu is visible
     */
    public async isMainMenuVisible(): Promise<boolean> {
        return await this.page.locator(this.locators.menuContainer).isVisible();
    }

        /**
     * Clicks on a main menu item by its text
     * @param itemText - The text of the menu item to click
     */
        public async clickMenuItem(itemText: string): Promise<void> {
            const menuItemLocator = this.page.locator(this.locators.menuItems).filter({ hasText: itemText}).first();
            await menuItemLocator.waitFor({ state: 'visible' });
            await menuItemLocator.click();
        }

    /**
     * Check menu item is visible
     */
    public async isMenuItemVisible(itemText: string): Promise<boolean> {
        const menuItemLocator = this.page.locator(this.locators.menuItems).filter({ hasText: itemText}).first();
        return await menuItemLocator.isVisible();
    }  

       /**
     * Navigates to a submenu by clicking on a menu item that has a submenu
     * @param menuItemText - Text of the menu item that has a submenu
     */
       public async clickSubmenuItem(subMenuItemText: string): Promise<void> {
            const subMenuItemLocator = this.page.locator(this.locators.menuItems).filter({ hasText: subMenuItemText}).first();
            await subMenuItemLocator.waitFor({ state: 'visible' });
            await subMenuItemLocator.click();
    }

        /**
     * Check submenu item is visible
     */
        public async isSubmenuItemVisible(subMenuItemText: string): Promise<boolean> {
            const subMenuItemLocator = this.page.locator(this.locators.menuItems).filter({ hasText: subMenuItemText }).first();
            return await subMenuItemLocator.isVisible();
        }

    /**
     * Navigates back to the main menu from a submenu
     */
    public async backToMainMenu(): Promise<void> {
        const backButton = this.page.locator(this.locators.backButton);
        if (await backButton.isVisible()) {
            await backButton.click();
            // Wait for main menu to be visible again
            await this.page.locator(this.locators.mainMenu).waitFor({ state: 'visible' });
        }
    }

    /**
     * Navigates to a section in the main menu by its title
     * @param sectionTitle - The title of the section to navigate to
     */
    public async navigateToSection(sectionTitle: string): Promise<void> {
        await this.openMainMenu();
        
        // Find the section title
        const sectionTitleXPath = `//div[contains(@class, "hmenu-title") and contains(text(), "${sectionTitle}")]`;
        const sectionTitleElement = this.page.locator(sectionTitleXPath);
        
        // Scroll to the section
        await sectionTitleElement.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500); // Small delay to ensure the section is in view
    }

    /**
     * Expands a compressed section by clicking "See all"
     * @param near - Text near the "See all" button to identify the correct one
     */
    public async expandSection(near: string): Promise<void> {
        await this.openMainMenu();
        
        // Find the "See all" button near the specified text
        const nearElementXPath = `//div[contains(text(), "${near}")]`;
        await this.page.locator(nearElementXPath).scrollIntoViewIfNeeded();
        
        // Find the closest "See all" button
        const seeAllButtonXPath = `(${nearElementXPath}/ancestor::li/following-sibling::li//a[contains(@class, "hmenu-compressed-btn")])[1]`;
        const seeAllButton = this.page.locator(seeAllButtonXPath);
        
        if (await seeAllButton.isVisible()) {
            await seeAllButton.click();
            await this.page.waitForTimeout(500); // Wait for animation to complete
        }
    }

    /**
     * Collapses an expanded section by clicking "See less"
     * @param near - Text near the "See less" button to identify the correct one
     */
    public async collapseSection(near: string): Promise<void> {
        await this.openMainMenu();
        
        // Find the "See less" button near the specified text
        const nearElementXPath = `//div[contains(text(), "${near}")]`;
        await this.page.locator(nearElementXPath).scrollIntoViewIfNeeded();
        
        // Find the closest "See less" button
        const seeLessButtonXPath = `(${nearElementXPath}/ancestor::li/following-sibling::li//a[contains(@class, "hmenu-expanded-btn")])[1]`;
        const seeLessButton = this.page.locator(seeLessButtonXPath);
        
        if (await seeLessButton.isVisible()) {
            await seeLessButton.click();
            await this.page.waitForTimeout(500); // Wait for animation to complete
        }
    }
    

    /**
     * Closes the main menu
     */
    public async closeMainMenu(): Promise<void> {
        // Check if menu is open
        const menuVisible = await this.page.locator(this.locators.menuContainer).isVisible();
        if (menuVisible) {
            // Click cross button to close it
            await this.page.locator('#hmenu-close-icon').click();
            await this.page.waitForSelector(this.locators.menuContainer, { state: 'hidden' });
        }
    }
}

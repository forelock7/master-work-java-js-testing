import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/basePage';
import { ElementState } from '@constants/elementState';

export class BooksPage extends BasePage {
    constructor(
        page: Page,
        private logOutLink: Locator = page.getByTestId('log-out-link'),
    ) {
        super(page);
    }

    async openLoginPage(loginPageUrl: string): Promise<void> {
        await this.openURL(loginPageUrl);
    }

    async waitForLogOutLinkIsVisible(): Promise<void> {
        await this.logOutLink.waitFor({ state: ElementState.VISIBLE });
    }
}

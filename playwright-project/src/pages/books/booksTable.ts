import {Locator, Page} from '@playwright/test';
import {BasePage} from '@pages/basePage';

export class BooksTable extends BasePage {
    constructor(
        page: Page,
        private tableBody: Locator = page.locator('tbody[id="books-list"]'),
        private tableRow: Locator = tableBody.locator('tr'),
    ) {
        super(page);
    }

    async openLoginPage(loginPageUrl: string): Promise<void> {
        await this.openURL(loginPageUrl);
    }

    async getRowsTextContents(): Promise<string[]> {
        return this.tableRow.allTextContents();
    }
}

import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/basePage';

export class BooksTable extends BasePage {
    constructor(
        page: Page,
        private tableBody: Locator = page.locator('tbody[id="books-list"]'),
        private tableRow: Locator = tableBody.locator('tr'),
        private editBookButton: Locator = page.locator(`button.update-book-button`),
        private deleteBookButton: Locator = page.locator(`button.delete-book-button`),
    ) {
        super(page);
    }

    async openLoginPage(loginPageUrl: string): Promise<void> {
        await this.openURL(loginPageUrl);
    }

    async getRowsTextContents(): Promise<string[]> {
        return this.tableRow.allTextContents();
    }

    async clickEditBookButton(bookId: number): Promise<void> {
        await this.tableBody
            .locator(`td[data-bookid="${bookId}"]`)
            .locator(this.editBookButton)
            .click();
    }

    async clickDeleteBookButton(bookId: number): Promise<void> {
        await this.tableBody
            .locator(`td[data-bookid="${bookId}"]`)
            .locator(this.deleteBookButton)
            .click();
    }
}

import {Locator, Page} from '@playwright/test';
import {BasePage} from '@pages/basePage';

export class BookForm extends BasePage {
    constructor(
        page: Page,
        private titleInput: Locator = page.locator(`input[id='title']`),
        private authorInput: Locator = page.locator(`input[id='author']`),
        private genreInput: Locator = page.locator(`input[id='genre']`),
        private yearInput: Locator = page.locator(`input[id='year']`),
        private addUpdateButton: Locator = page.locator(`button[id='add-update-form-button']`),
        private cancelButton: Locator = page.locator(`button[id='cancel-button']`),
    ) {
        super(page);
    }

    async openLoginPage(loginPageUrl: string): Promise<void> {
        await this.openURL(loginPageUrl);
    }

    async fillTitle(title: string): Promise<void> {
        await this.titleInput.fill(title);
    }

    async fillAuthor(author: string): Promise<void> {
        await this.authorInput.fill(author);
    }

    async fillGenre(genre: string): Promise<void> {
        await this.genreInput.fill(genre);
    }

    async fillYear(year: string): Promise<void> {
        await this.yearInput.fill(year);
    }

    async clickAddUpdateButton(): Promise<void> {
        await this.addUpdateButton.click();
    }

    async clickCancelButton(): Promise<void> {
        await this.cancelButton.click();
    }
}

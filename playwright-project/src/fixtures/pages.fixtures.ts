import {Fixtures, Page, PlaywrightTestArgs} from '@playwright/test';
import {LoginPageSteps} from '@steps/ui/login/loginPage.steps';
import {BookFormSteps} from '@steps/ui/books/bookForm.steps';
import {BooksTableSteps} from '@steps/ui/books/booksTable.steps';

export type PagesContextFixture = {
    contextPage: Page;
};

export type PagesFixture = {
    loginPageSteps: LoginPageSteps;
    bookFormSteps: BookFormSteps;
    booksTableSteps: BooksTableSteps;
};

export const pagesContextFixture: Fixtures<PagesContextFixture & PlaywrightTestArgs> = {
    contextPage: async ({ page }, use) => {
        await use(page);
    },
};

export const pagesFixture: Fixtures<PagesFixture & PagesContextFixture> = {
    loginPageSteps: async ({ contextPage }, use) => {
        await use(new LoginPageSteps(contextPage));
    },
    bookFormSteps: async ({ contextPage }, use) => {
        await use(new BookFormSteps(contextPage));
    },
    booksTableSteps: async ({ contextPage }, use) => {
        await use(new BooksTableSteps(contextPage));
    },
};

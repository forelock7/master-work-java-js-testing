import {Fixtures, Page, PlaywrightTestArgs} from '@playwright/test';
import {LoginPageSteps} from '@steps/ui/loginPage.steps';

export type PagesContextFixture = {
    contextPage: Page;
};

export type PagesFixture = {
    loginPageSteps: LoginPageSteps;
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
};

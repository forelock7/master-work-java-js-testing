import {expect, Page, test} from '@playwright/test';
import {LoginPage} from '@pages/loginPage';
import {UserContext} from '@config/userContext';
import {BrowserSteps} from '@steps/ui/browser.steps';

export class LoginPageSteps extends BrowserSteps {
    constructor(
        page: Page,
        private loginPage: LoginPage = new LoginPage(page),
    ) {
        super(page);
    }

    logIn = async (userContext: UserContext): Promise<void> => {
        await test.step(`Log in as '${userContext.email}' user`, async () => {
            await this.loginPage.openLoginPage(userContext.baseUrl);
            await this.loginPage.fillUsername(userContext.email);
            await this.loginPage.fillPassword(userContext.password);
            await this.loginPage.clickLoginButton();

            // await this.booksPage.waitAnalyticsPageOpened();
        });
    };

    verifyLoginPageIsOpen = async (): Promise<void> => {
        await test.step(`Verify 'Login' page is open`, async () => {
            await this.loginPage.waitForLoginPageOpened();
        });
    };

    /**
     * Fills 'Username/Email' field with provided text
     * @param text - text to be filled in
     */
    typeTextIntoUsernameField = async (text: string): Promise<void> => {
        await test.step(`Type '${text}' into 'Username/Email' field on 'Login' page`, async () => {
            await this.loginPage.fillUsername(text);
        });
    };

    /**
     * Fills 'Password' field with provided text
     * @param text - text to be filled in
     */
    typeTextIntoPasswordField = async (text: string): Promise<void> => {
        await test.step(`Type '${text}' into 'Password' field on 'Login' page`, async () => {
            await this.loginPage.fillPassword(text);
        });
    };

    /**
     * Clicks 'Login' button
     */
    clickLoginButton = async (): Promise<void> => {
        await test.step(`Click 'Login' button on 'Login' page`, async () => {
            await this.loginPage.clickLoginButton();
        });
    };

    /**
     * Verifies error text equals expected one
     * @param expectedErrorText - expected error text to compare
     */
    verifyErrorTextEquals = async (expectedErrorText: string): Promise<void> => {
        await test.step(`Verify error text is '${expectedErrorText}' on 'Login' page`, async () => {
            expect(await this.loginPage.getErrorText()).toEqual(expectedErrorText);
        });
    };

    /**
     * Opens Forgot password page
     */
    clickForgotPasswordLink = async (): Promise<void> => {
        await test.step(`Click 'Forgot your password?' link on 'Login' page`, async () => {
            await this.loginPage.clickForgotPasswordLink();
        });
    };
}

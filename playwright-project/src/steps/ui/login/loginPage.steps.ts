import { Page, test } from '@playwright/test';
import { LoginPage } from '@pages/login/loginPage';
import { UserContext } from '@config/userContext';
import { BrowserSteps } from '@steps/ui/browser.steps';
import { BooksPage } from '@pages/books/booksPage';

export class LoginPageSteps extends BrowserSteps {
    constructor(
        page: Page,
        private loginPage: LoginPage = new LoginPage(page),
        private booksPage: BooksPage = new BooksPage(page),
    ) {
        super(page);
    }

    logIn = async (userContext: UserContext): Promise<void> => {
        await test.step(`Log in as '${userContext.email}' user`, async () => {
            await this.loginPage.openLoginPage();
            await this.fillUsernameField(userContext.email);
            await this.fillPasswordField(userContext.password);
            await this.clickLoginButton();

            await this.booksPage.waitForLogOutLinkIsVisible();
        });
    };

    verifyLoginPageIsOpen = async (): Promise<void> => {
        await test.step(`Verify 'Login' page is open`, async () => {
            await this.loginPage.waitForLoginPageOpened();
        });
    };

    /**
     * Fills 'Username/Email' input field
     * @param username
     */
    fillUsernameField = async (username: string): Promise<void> => {
        await test.step(`Fill 'Username' input by '${username}' on 'Login' page`, async () => {
            await this.loginPage.fillUsernameInput(username);
        });
    };

    /**
     * Fills 'Password' input field
     * @param password
     */
    fillPasswordField = async (password: string): Promise<void> => {
        await test.step(`Fill 'Password' input by '${password}' on 'Login' page`, async () => {
            await this.loginPage.fillPasswordInput(password);
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
}

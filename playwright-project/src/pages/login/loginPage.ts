import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/basePage';
import { ElementState } from '@constants/elementState';

export class LoginPage extends BasePage {
    constructor(
        page: Page,
        private usernameInput: Locator = page.locator('input[id=email]'),
        private passwordInput: Locator = page.locator('input[id=password]'),
        private loginButton: Locator = page.getByRole('button', { name: 'Login' }),
    ) {
        super(page);
    }

    async openLoginPage(): Promise<void> {
        await this.openURL('/');
    }

    async fillUsernameInput(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async fillPasswordInput(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async waitForLoginPageOpened(): Promise<void> {
        await this.usernameInput.waitFor({ state: ElementState.VISIBLE });
    }
}

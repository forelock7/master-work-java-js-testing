class LoginPage {
    // Define selectors for elements on the login page
    getUsernameField() {
        return cy.get('input[id="email"]');
    }

    getPasswordField() {
        return cy.get('input[id="password"]');
    }

    getLoginButton() {
        return cy.get('button[type="submit"]');
    }

    // Define actions for interacting with the page
    visit() {
        cy.visit('/');
    }

    enterUsername(username) {
        this.getUsernameField().type(username);
    }

    enterPassword(password) {
        this.getPasswordField().type(password);
    }

    clickLoginButton() {
        this.getLoginButton().click();
    }
}

export default new LoginPage();

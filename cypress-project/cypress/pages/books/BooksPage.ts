class BooksPage {
    // Define selectors for elements on the login page
    getUsernameField() {
        return cy.get('[data-testid="log-out-link"]');
    }

    waitForLogOutLinkIsVisible() {
        this.getUsernameField().should('be.visible');
    }
}

export default new BooksPage();
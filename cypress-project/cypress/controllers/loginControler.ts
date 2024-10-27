class Login {
    private static readonly LOGIN_URL = '/api/login';

    static postLogin(userContext: { username: string; password: string }): Cypress.Chainable {
        return cy.request({
            method: 'POST',
            url: this.LOGIN_URL,
            body: {
                email: userContext.username,
                password: userContext.password,
            },
        });
    }
}

export default new Login();

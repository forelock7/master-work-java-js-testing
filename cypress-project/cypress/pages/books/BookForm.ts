class BookForm {
    // Method to return the username field (example of how to use cy.get)
    getTitleField() {
        return cy.get('input[id="title"]');
    }

    getAuthorField() {
        return cy.get('input[id="author"]');
    }

    getGenreField() {
        return cy.get('input[id="genre"]');
    }

    getYearField() {
        return cy.get('input[id="year"]');
    }

    getAddUpdateButton() {
        return cy.get('button[id="add-update-form-button"]');
    }

    getCancelButton() {
        return cy.get('button[id="cancel-button"]');
    }

    // Method to open a URL (login page in this case)
    openLoginPage(loginPageUrl) {
        cy.visit(loginPageUrl);
    }

    // Method to fill in the title field
    fillTitle(title) {
        this.getTitleField().clear().type(title);
    }

    // Method to fill in the author field
    fillAuthor(author) {
        this.getAuthorField().clear().type(author);
    }

    // Method to fill in the genre field
    fillGenre(genre) {
        this.getGenreField().clear().type(genre);
    }

    // Method to fill in the year field
    fillYear(year) {
        this.getYearField().clear().type(year);
    }

    // Method to click the add/update button
    clickAddUpdateButton() {
        this.getAddUpdateButton().click();
    }

    // Method to click the cancel button
    clickCancelButton() {
        this.getCancelButton().click();
    }
}

export default new BookForm();
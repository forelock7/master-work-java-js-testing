class BooksTable {
    // Method to return the table body
    getTableBody() {
        return cy.get('tbody[id="books-list"]');
    }

    // Method to return all rows in the table body
    getTableRows() {
        return this.getTableBody().find('tr');
    }
    getEditBookButton() {
        return `button.update-book-button`;
    }

    getDeleteBookButton() {
        return `button.delete-book-button`;
    }

    // Method to get text contents of all rows in the table and return them as string[]
    getRowsTextContents(): Cypress.Chainable<string[]> {
        return this.getTableRows().then(($rows) => {
            const rowsText: string[] = [];

            // Loop over each row to extract the text content
            $rows.each((index, row) => {
                const $row = Cypress.$(row);
                const rowText = $row.text().trim(); // Extract text content from the row
                rowsText.push(rowText);
            });

            return rowsText; // Return the array of row text contents as strings
        });
    }

    /**
     * Click the edit button for a specific book by its ID
     * @param bookId - The ID of the book to edit
     */
    public clickEditBookButton(bookId: number): void {
        this.getTableBody()
            .find(`td[data-bookid="${bookId}"]`)
            .find(this.getEditBookButton())
            .click(); // Cypress automatically waits for elements to be actionable
    }

    /**
     * Click the delete button for a specific book by its ID
     * @param bookId - The ID of the book to delete
     */
    public clickDeleteBookButton(bookId: number): void {
        this.getTableBody()
            .find(`td[data-bookid="${bookId}"]`)
            .find(this.getDeleteBookButton())
            .click(); // Cypress automatically waits for elements to be actionable
    }
}

export default new BooksTable();

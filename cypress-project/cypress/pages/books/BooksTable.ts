class BooksTable {
    // Method to return the table body
    getTableBody() {
        return cy.get('tbody[id="books-list"]');
    }

    // Method to return all rows in the table body
    getTableRows() {
        return this.getTableBody().find('tr');
    }

    // // Method to get text contents of all rows in the table
    // getRowsTextContents() {
    //     const rowContents = [];
    //     return this.getTableRows()
    //         .each(($row) => {
    //             rowContents.push($row.text()); // Capture the text content of each row
    //         })
    //         .then(() => {
    //             return rowContents; // Return the array of row text contents
    //         });
    // }

    // // Method to get text contents of all rows in the table
    // getRowsTextContents(): Cypress.Chainable<string[]> {
    //     return this.getTableRows().then(($rows) => {
    //         return Cypress._.map($rows, (row) => {
    //             return Cypress.$(row).text();
    //         });
    //     });
    // }

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
}

export default new BooksTable();

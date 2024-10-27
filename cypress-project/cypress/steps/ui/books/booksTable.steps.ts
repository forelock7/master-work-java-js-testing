import BooksTable from '../../../pages/books/BooksTable';

class BooksTableSteps {
    /**
     * Verifies that the expected rows are present in the table on the 'Books' page
     * @param rows - an array of strings representing the expected rows
     */
    verifyRowsArePresent(rows: string[]): void {
        cy.log("Polling to verify rows are present in the table on the 'Books' page");

        // Retry logic using custom polling with a fixed number of retries
        const maxAttempts = 10; // Number of polling attempts
        const pollingInterval = 1000; // Time to wait between attempts (in ms)

        function pollForRows(attempt: number): void {
            cy.log(`Polling attempt #${attempt}`);

            // Get the actual rows from the table
            BooksTable.getRowsTextContents().then((actualRows: string[]) => {
                const cleanedRows = actualRows.map(
                    (book: string) =>
                        book
                            .replace(/^\s*\d+\s*/, '') // Remove leading numbers
                            .replace(/[\s·]+/g, ' ') // Normalize spaces and remove dots
                            .replace(/\b(Delete|Edit)\b/g, '') // Remove "Delete" and "Edit"
                            .trim(), // Trim remaining whitespace
                );

                // If the cleaned rows contain the expected rows, stop polling and pass the test
                try {
                    expect(cleanedRows).to.include.members(rows);
                    cy.log('Rows matched, stopping polling.');
                } catch (error) {
                    if (attempt < maxAttempts) {
                        cy.wait(pollingInterval); // Wait before the next attempt
                        pollForRows(attempt + 1); // Recursive call to poll again
                    } else {
                        throw new Error('Expected rows were not found within the given time');
                    }
                }
            });
        }

        // Start polling with the first attempt
        pollForRows(1);
    }

    /**
     * Verifies that the expected rows are absent in the table on the 'Books' page
     * @param rows - an array of strings representing the expected rows
     */
    verifyRowsAreAbsent(rows: string[]): void {
        cy.log("Polling to verify rows are present in the table on the 'Books' page");

        // Retry logic using custom polling with a fixed number of retries
        const maxAttempts = 10; // Number of polling attempts
        const pollingInterval = 1000; // Time to wait between attempts (in ms)

        function pollForRows(attempt: number): void {
            cy.log(`Polling attempt #${attempt}`);

            // Get the actual rows from the table
            BooksTable.getRowsTextContents().then((actualRows: string[]) => {
                const cleanedRows = actualRows.map(
                    (book: string) =>
                        book
                            .replace(/^\s*\d+\s*/, '') // Remove leading numbers
                            .replace(/[\s·]+/g, ' ') // Normalize spaces and remove dots
                            .replace(/\b(Delete|Edit)\b/g, '') // Remove "Delete" and "Edit"
                            .trim(), // Trim remaining whitespace
                );

                // If the cleaned rows contain the expected rows, stop polling and pass the test
                try {
                    expect(cleanedRows).to.not.include.members(rows);
                    cy.log('Rows matched, stopping polling.');
                } catch (error) {
                    if (attempt < maxAttempts) {
                        cy.wait(pollingInterval); // Wait before the next attempt
                        pollForRows(attempt + 1); // Recursive call to poll again
                    } else {
                        throw new Error('Expected rows were not found within the given time');
                    }
                }
            });
        }

        // Start polling with the first attempt
        pollForRows(1);
    }
}

export default new BooksTableSteps();

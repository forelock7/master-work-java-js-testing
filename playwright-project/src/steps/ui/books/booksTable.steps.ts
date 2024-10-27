import { expect, Page, test } from '@playwright/test';
import { BrowserSteps } from '@steps/ui/browser.steps';
import { BooksTable } from '@pages/books/booksTable';

export class BooksTableSteps extends BrowserSteps {
    constructor(
        page: Page,
        private booksTable: BooksTable = new BooksTable(page),
    ) {
        super(page);
    }

    private getRowsTextAndModify = async (): Promise<string[]> => {
        let actualRows: string[] = await this.booksTable.getRowsTextContents();
        return actualRows.map((book) =>
            book
                .replace(/^\s*\d+\s*/, '') // Remove the first number at the beginning of the line
                .replace(/[\s·]+/g, ' ') // Remove extra spaces, newlines, and "·" characters
                .replace(/\b(Delete|Edit)\b/g, '') // Remove "Delete" and "Edit" words
                .trim(),
        );
    };

    /**
     * Verifies provided rows are present in Books table
     * @param rows - rows represented as string
     */
    verifyRowsArePresent = async (rows: string[]): Promise<void> => {
        await test.step(`Verify rows are present in table on 'Books' page`, async () => {
            await expect
                .poll(async () => {
                    return this.getRowsTextAndModify();
                })
                .toEqual(expect.arrayContaining(rows));
        });
    };

    /**
     * Verifies provided rows are absent in Books table
     * @param rows - rows represented as string
     */
    verifyRowsAreAbsent = async (rows: string[]): Promise<void> => {
        await test.step(`Verify rows are absent in table on 'Books' page`, async () => {
            await expect
                .poll(async () => {
                    return this.getRowsTextAndModify();
                })
                .not.toEqual(expect.arrayContaining(rows));
        });
    };

    /**
     * Verifies provided rows are absent in Books table
     * @param rows - rows represented as string
     */
    deleteBookById = async (bookId: number): Promise<void> => {
        await test.step(`Delete book with '${bookId}' ID from table on 'Books' page`, async () => {
            await this.booksTable.clickDeleteBookButton(bookId);
        });
    };
}

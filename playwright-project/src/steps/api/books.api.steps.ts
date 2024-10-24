import {UserContext} from '@config/userContext';
import {expect, test} from '@playwright/test';
import {Books} from '../../controllers/books';
import {Book} from '../../models/book';

export class BooksApiSteps {
    /**
     * Get books
     * @param userContext - user context that executes the API request
     * @public
     * @return array of Book objects
     */
    public static async getBooks(userContext: UserContext): Promise<Book[]> {
        return test.step(`Get books by '${userContext.username}' via API`, async () => {
            const res = await Books.getBooks(userContext);
            expect(res.status()).toBe(200);
            return res.json();
        });
    }

    /**
     * Verifies a data model contains provided columns
     * @param userContext - user that makes the API call
     * @param tittles - expected existing books' tittles
     * @public
     */
    public static async verifyBooksArePresentByTittle(
        userContext: UserContext,
        tittles: string[],
    ): Promise<void> {
        await test.step(`Verify '${tittles}' are present by '${userContext.username}' via API`, async (): Promise<void> => {
            const books: Book[] = await this.getBooks(userContext);
            const actualBooks = books.map((b) => b.title);
            expect(actualBooks).toEqual(expect.arrayContaining(tittles));
        });
    }
}

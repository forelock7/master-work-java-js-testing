import { UserContext } from '../../../config/userContext';
import { Book } from '../../../models/book';
import BooksController from '../../../controllers/booksController';

class BooksApiSteps {
    /**
     * Get books
     * @param userContext - user context that executes the API request
     * @public
     * @return array of Book objects
     */
    public static getBooks(userContext: UserContext): Cypress.Chainable<Book[]> {
        return BooksController.getBooks(userContext).then((response) => {
            expect(response.status).to.eq(200);
            return response.body;
        });
    }

    /**
     * Get book by title
     * @param userContext - user context that executes the API request
     * @param bookTitle - book's title
     * @public
     * @return Book's object
     */
    public static getBookByTitle(userContext: UserContext, bookTitle: string) {
        return this.getBooks(userContext).then((books: Book[]) => {
            return books.find((book) => book.title === bookTitle);
        });
    }

    /**
     * Create book by book object
     * @param userContext - user context that executes the API request
     * @param book - book DTO which is going to be created
     * @public
     */
    public static createBook(userContext: UserContext, book: Book) {
        BooksController.createBook(userContext, book).then((response) => {
            expect(response.status).to.eq(201);
        });
    }

    /**
     * Delete book by book ID
     * @param userContext - user context that executes the API request
     * @param bookId - book ID
     * @public
     */
    public static deleteBookById(userContext: UserContext, bookId: number) {
        BooksController.deleteBook(userContext, bookId).then((response) => {
            expect(response.status).to.eq(204);
        });
    }

    /**
     * Delete book by book Title
     * @param userContext - user context that executes the API request
     * @param bookTitle - book's title
     * @public
     */
    public static deleteBookByTitle(userContext: UserContext, bookTitle: string) {
        this.getBookByTitle(userContext, bookTitle).then((book) => {
            if (book.title) {
                return this.deleteBookById(userContext, book.id!);
            } else {
                cy.log(`Book with title '${bookTitle}' not found`);
            }
        });
    }

    /**
     * Update book
     * @param userContext - user context that executes the API request
     * @param book - book DTO which is going to be updated
     * @public
     */
    public static updateBook(userContext: UserContext, book: Book) {
        return this.getBookByTitle(userContext, book.title).then((existingBook) => {
            if (existingBook) {
                return cy
                    .request({
                        method: 'PUT',
                        url: `/api/books/${existingBook.id}`,
                        headers: {
                            Authorization: `Bearer ${userContext.token}`,
                        },
                        body: book,
                    })
                    .then((response) => {
                        expect(response.status).to.eq(204);
                    });
            } else {
                throw new Error(`Book titled '${book.title}' not found`);
            }
        });
    }

    /**
     * Verifies books are present by titles
     * @param userContext - user context that executes the API request
     * @param titles - expected existing books' titles
     * @public
     */
    public static verifyBooksArePresentByTitle(userContext: UserContext, titles: string[]) {
        return this.getBooks(userContext).then((books: Book[]) => {
            const actualTitles = books.map((b) => b.title);
            expect(actualTitles).to.include.members(titles);
        });
    }

    /**
     * Verifies books are present
     * @param userContext - user context that executes the API request
     * @param books - expected existing books
     * @public
     */
    public static verifyBooksArePresent(userContext: UserContext, books: Book[]) {
        return this.getBooks(userContext).then((actualBooks: Book[]) => {
            const cleanedActualBooks = actualBooks.map(({ id, ...rest }) => rest);
            expect(cleanedActualBooks).to.deep.include.members(books);
        });
    }

    /**
     * Verifies books are absent
     * @param userContext - user context that executes the API request
     * @param books - expected not existing books
     * @public
     */
    public static verifyBooksAreAbsent(userContext: UserContext, books: Book[]) {
        return this.getBooks(userContext).then((actualBooks: Book[]) => {
            const cleanedActualBooks = actualBooks.map(({ id, ...rest }) => rest);
            expect(cleanedActualBooks).to.not.deep.include.members(books);
        });
    }
}

export default BooksApiSteps;

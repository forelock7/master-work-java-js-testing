import {UserContext} from '@config/userContext';
import {expect, test} from '@playwright/test';
import {BooksController} from '@controllers/booksController';
import {Book} from '@models/book';
import console from 'console';

export class BooksApiSteps {
    /**
     * Get books
     * @param userContext - user context that executes the API request
     * @public
     * @return array of Book objects
     */
    public static async getBooks(userContext: UserContext): Promise<Book[]> {
        return test.step(`Get books by '${userContext.username}' via API`, async () => {
            const res = await BooksController.getBooks(userContext);
            expect(res.status()).toBe(200);
            return res.json();
        });
    }

    /**
     * Get book by title
     * @param userContext - user context that executes the API request
     * @param bookTitle - book's title
     * @public
     * @return Book's object
     */
    public static async getBookByTitle(
        userContext: UserContext,
        bookTitle: string,
    ): Promise<Book | undefined> {
        return test.step(`Get books by '${userContext.username}' via API`, async () => {
            const books: Book[] = await this.getBooks(userContext);
            return books.find((b) => b.title === bookTitle);
        });
    }

    /**
     * Create book by book object
     * @param userContext - user context that executes the API request
     * @param book - book DTO which is going to be created
     * @public
     */
    public static async createBook(userContext: UserContext, book: Book): Promise<void> {
        await test.step(`Create '${book.title}' book by '${userContext.username}' via API`, async () => {
            const res = await BooksController.createBook(userContext, book);
            expect(res.status()).toBe(201);
        });
    }

    /**
     * Delete book by book ID
     * @param userContext - user context that executes the API request
     * @param bookId - book ID
     * @public
     */
    public static async deleteBookById(userContext: UserContext, bookId: number): Promise<void> {
        await test.step(`Delete book with '${bookId}' ID by '${userContext.username}' via API`, async () => {
            const res = await BooksController.deleteBook(userContext, bookId);
            expect(res.status()).toBe(204);
        });
    }

    /**
     * Delete book by book Title
     * @param userContext - user context that executes the API request
     * @param bookTitle - book's title
     * @public
     */
    public static async deleteBookByTitle(
        userContext: UserContext,
        bookTitle: string,
    ): Promise<void> {
        await test.step(`Delete book with '${bookTitle}' title by '${userContext.username}' via API`, async () => {
            const book = await this.getBookByTitle(userContext, bookTitle);
            if (book) {
                await this.deleteBookById(userContext, book.id!);
            } else {
                console.log(`'${bookTitle}' book not found`);
            }
        });
    }

    /**
     * Update book
     * @param userContext - user context that executes the API request
     * @param book - book DTO which is going to be updated
     * @public
     */
    public static async updateBook(userContext: UserContext, book: Book): Promise<void> {
        await test.step(`Delete book with '${book.id}' ID by '${userContext.username}' via API`, async () => {
            let bookId: number;
            let updatedBook: Book;
            if (book.id) {
                bookId = book.id;
                const { id, ...rest } = book;
                updatedBook = rest;
            } else {
                const existingBook = await this.getBookByTitle(userContext, book.title);
                if (existingBook) {
                    bookId = existingBook.id!;
                    updatedBook = book;
                } else {
                    throw new Error(`'${book.title}' book not found`);
                }
            }
            const res = await BooksController.updateBook(userContext, bookId, updatedBook);
            expect(res.status()).toBe(204);
        });
    }

    /**
     * Verifies books are present by titles
     * @param userContext - user context that executes the API request
     * @param titles - expected existing books' titles
     * @public
     */
    public static async verifyBooksArePresentByTitle(
        userContext: UserContext,
        titles: string[],
    ): Promise<void> {
        await test.step(`Verify '${titles}' are present by '${userContext.username}' via API`, async (): Promise<void> => {
            const books: Book[] = await this.getBooks(userContext);
            const actualBooks = books.map((b) => b.title);
            expect(actualBooks).toEqual(expect.arrayContaining(titles));
        });
    }

    /**
     * Verifies books are present
     * @param userContext - user context that executes the API request
     * @param books - expected existing books
     * @public
     */
    public static async verifyBooksArePresent(
        userContext: UserContext,
        books: Book[],
    ): Promise<void> {
        await test.step(`Verify books are present by '${userContext.username}' via API`, async (): Promise<void> => {
            const actualBooks: Book[] = await this.getBooks(userContext);
            // Remove the `id` key from each book
            const updatedBooks = actualBooks.map(({ id, ...rest }) => rest);
            expect(updatedBooks).toEqual(expect.arrayContaining(books));
        });
    }

    /**
     * Verifies books are absent
     * @param userContext - user context that executes the API request
     * @param books - expected not existing books
     * @public
     */
    public static async verifyBooksAreAbsent(
        userContext: UserContext,
        books: Book[],
    ): Promise<void> {
        await test.step(`Verify books are absent by '${userContext.username}' via API`, async (): Promise<void> => {
            const actualBooks: Book[] = await this.getBooks(userContext);
            // Remove the `id` key from each book
            const updatedBooks = actualBooks.map(({ id, ...rest }) => rest);
            expect(updatedBooks).not.toEqual(expect.arrayContaining(books));
        });
    }
}

import { Book } from '../models/book';
import { UserContext } from '../config/userContext';

class BooksController {
    private static readonly BOOKS_URL = '/api/books';

    /**
     * Fetches all books using a GET request
     * @param userContext - Contains the authentication details like username/password or token
     */
    public static getBooks(userContext: UserContext): Cypress.Chainable {
        return cy.request({
            method: 'GET',
            url: this.BOOKS_URL,
            headers: {
                Authorization: `Bearer ${userContext.token}`, // Assuming a token-based authentication
            },
        });
    }

    /**
     * Creates a new book using a POST request
     * @param userContext - Contains the authentication details like username/password or token
     * @param book - The book object to be created
     */
    public static createBook(userContext: UserContext, book: Book): Cypress.Chainable {
        return cy.request({
            method: 'POST',
            url: this.BOOKS_URL,
            headers: {
                Authorization: `Bearer ${userContext.token}`,
            },
            body: book, // Send the book object as the request body
        });
    }

    /**
     * Updates a book using a PUT request
     * @param userContext - Contains the authentication details like username/password or token
     * @param bookId - ID of the book to be updated
     * @param book - The updated book object
     */
    public static updateBook(
        userContext: UserContext,
        bookId: number,
        book: Book,
    ): Cypress.Chainable {
        return cy.request({
            method: 'PUT',
            url: `${this.BOOKS_URL}/${bookId}`,
            headers: {
                Authorization: `Bearer ${userContext.token}`,
            },
            body: book, // Send the updated book data as the request body
        });
    }

    /**
     * Deletes a book using a DELETE request
     * @param userContext - Contains the authentication details like username/password or token
     * @param bookId - ID of the book to be deleted
     */
    public static deleteBook(userContext: UserContext, bookId: number): Cypress.Chainable {
        return cy.request({
            method: 'DELETE',
            url: `${this.BOOKS_URL}/${bookId}`,
            headers: {
                Authorization: `Bearer ${userContext.token}`,
            },
        });
    }
}

export default BooksController;

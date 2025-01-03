import { APIRequestContext, APIResponse } from '@playwright/test';
import { UserContext } from '@config/userContext';
import { getAuthorizedContext } from './restClient';
import { Book } from '@models/book';

export class BooksController {
    private static readonly BOOKS = '/api/books';

    public static async getBooks(userContext: UserContext): Promise<APIResponse> {
        const apiContext: APIRequestContext = await getAuthorizedContext(userContext);
        return apiContext.get(this.BOOKS);
    }

    public static async createBook(userContext: UserContext, book: Book): Promise<APIResponse> {
        const apiContext: APIRequestContext = await getAuthorizedContext(userContext);
        return apiContext.post(this.BOOKS, { data: book });
    }

    public static async updateBook(
        userContext: UserContext,
        bookId: number,
        book: Book,
    ): Promise<APIResponse> {
        const apiContext: APIRequestContext = await getAuthorizedContext(userContext);
        return apiContext.put(`${this.BOOKS}/${bookId}`, { data: book });
    }

    public static async deleteBook(userContext: UserContext, bookId: number): Promise<APIResponse> {
        const apiContext: APIRequestContext = await getAuthorizedContext(userContext);
        return apiContext.delete(`${this.BOOKS}/${bookId}`);
    }
}

import {APIRequestContext, APIResponse} from '@playwright/test';
import {UserContext} from '@config/userContext';
import {getAuthorizedContext} from './restClient';

export class Books {
    private static readonly BOOKS = '/api/books';

    static async getBooks(userContext: UserContext): Promise<APIResponse> {
        const apiContext: APIRequestContext = await getAuthorizedContext(userContext);
        return apiContext.get(this.BOOKS);
    }
}

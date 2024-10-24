import {APIRequestContext, APIResponse} from '@playwright/test';
import {UserContext} from '@config/userContext';

export class Login {
    private static readonly LOGIN = '/api/login';

    static async postLogin(
        userContext: UserContext,
        apiContext: APIRequestContext,
    ): Promise<APIResponse> {
        return apiContext.post(this.LOGIN, {
            data: {
                email: userContext.username,
                password: userContext.password,
            },
        });
    }
}

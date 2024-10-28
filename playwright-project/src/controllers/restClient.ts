// Creates initial context based on URL
import { APIRequestContext, request } from '@playwright/test';
import { UserContext } from '@config/userContext';

// // Creates initial context based on URL
// export const getInitContext = async (baseURL: string) => {
//     return request.newContext({
//         baseURL,
//     });
// };
//
// // Gets and saves access token in user context
// const getAccessToken = async (userContext: UserContext) => {
//     const initContext: APIRequestContext = await getInitContext(userContext.baseUrl);
//     const res: APIResponse = await Login.postLogin(userContext, initContext);
//     expect(res.status()).toBe(200);
//     return '';
// };

// Gets authorized user context further usage in REST API calls
export const getAuthorizedContext = async (
    userContext: UserContext,
): Promise<APIRequestContext> => {
    const accessToken = userContext.token; //?? (await getAccessToken(userContext));
    let extraHTTPHeaders: { Authorization: string } = {
        Authorization: `Bearer ${accessToken}`,
    };
    return request.newContext({
        // baseURL: userContext.baseUrl,
        extraHTTPHeaders,
        timeout: 30 * 1000,
    });
};

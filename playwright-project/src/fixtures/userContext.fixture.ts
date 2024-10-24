import {Fixtures} from '@playwright/test';
import {UserContext} from '@config/userContext';
import {envConfig} from '@constants/env.config';

// Declare the types of your fixtures.
export type UserContextFixture = {
    userContext: UserContext;
};

export const userFixture: Fixtures<{ userContext: UserContext }> = {
    userContext: [
        async ({}, use) => {
            const userContext: UserContext = await setupUserContext();
            await use(userContext);
        },
        { option: true },
    ],
};

export async function setupUserContext(): Promise<UserContext> {
    const password: string = process.env.PASSWORD || '';
    return new UserContext(envConfig.username, password);
}

export { expect } from '@playwright/test';

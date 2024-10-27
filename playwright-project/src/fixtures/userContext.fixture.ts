import {Fixtures} from '@playwright/test';
import {UserContext} from '@config/userContext';
import {envConfig} from '@config/env.config';

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
    return new UserContext(envConfig.username, envConfig.password);
}

export { expect } from '@playwright/test';

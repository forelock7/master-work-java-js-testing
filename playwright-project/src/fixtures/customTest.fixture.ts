import { Fixtures, test as base } from '@playwright/test';
import {
    PagesContextFixture,
    pagesContextFixture,
    PagesFixture,
    pagesFixture,
} from './pages.fixtures';
import { UserContextFixture, userFixture } from './userContext.fixture';

const combineFixtures = (...args: Fixtures[]): Fixtures =>
    args.reduce((acc, fixture) => ({ ...acc, ...fixture }), {});

export const customTest = base.extend<PagesFixture & UserContextFixture & PagesContextFixture>(
    combineFixtures(pagesFixture, userFixture, pagesContextFixture),
);

export { expect } from '@playwright/test';

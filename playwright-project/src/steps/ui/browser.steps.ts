import {UserContext} from '@config/userContext';
import {
    BasePage,
    browserConsoleErrors,
    resetResourceResponses,
    resourceFilesData,
    resourceResponses,
} from '@pages/basePage';
import test, {expect, Page, Response} from '@playwright/test';
import {ResourceFileData} from '@models/resourceFileData';
import {ResourceFileType} from '@constants/resourceFileType';
import console from 'console';
import {filterNetworkResources} from '@utils/browserNetworkUtils';

export class BrowserSteps {
    constructor(
        protected page: Page,
        private basePage = new BasePage(page),
    ) {}

    /**
     * Reloads the current page and waits it's loaded
     */
    reloadPage = async (): Promise<void> => {
        await test.step('Reload current page', async () => {
            await this.basePage.reload();
        });
    };

    /**
     * Opens a page by provided URL on the current page and waits it's loaded
     * @param url
     */
    openPageByURL = async (url: string): Promise<void> => {
        await test.step(`Open page by URL '${url}'`, async () => {
            await this.basePage.openURL(url);
        });
    };

    /**
     * Opens a page by part URL on the current page
     * @param urlSuffix        - path of the URL that is added after BaseURL
     * @param userContext      - user to get correct BaseURL
     * @param waitPageIsLoaded - wait for page to load
     */
    openPageByPartURL = async (
        urlSuffix: string,
        userContext: UserContext,
        waitPageIsLoaded?: boolean,
    ): Promise<void> => {
        await test.step(`Open page by part URL '${urlSuffix}'`, async () => {
            await this.basePage.openByPartURL(userContext, urlSuffix, waitPageIsLoaded);
        });
    };

    /**
     * Opens BaseURL page via URL on the current page and waits it's loaded
     * @param userContext - user to get correct BaseURL
     */
    openBasePageURL = async (userContext: UserContext): Promise<void> => {
        await test.step(`Open base page '${userContext.baseUrl}'`, async () => {
            await this.basePage.openBaseURL(userContext);
        });
    };

    /**
     * Verifies the page's URL matches the expected one
     * @param expectedURL - expected URL
     */
    verifyPageURLEquals = async (expectedURL: string): Promise<void> => {
        await test.step(`Verify page URL is '${expectedURL}'`, async () => {
            const currentPageURL = this.basePage.getPageURL();
            expect(currentPageURL).toEqual(expectedURL);
        });
    };

    /**
     * Verifies the page URL contains expected part
     * @param partURL - expected part of the URL
     */
    verifyPageURLContains = async (partURL: string) => {
        await test.step(`Verify page URL contains '${partURL}'`, async () => {
            await expect(async () => {
                const currentPageURL = this.basePage.getPageURL();
                expect(currentPageURL).toContain(partURL);
            }).toPass({
                timeout: 5 * 1000,
            });
        });
    };

    /**
     * Gets current page URL
     */
    getPageURL = async (): Promise<string> => {
        return test.step(`Get current page URL`, async () => {
            return this.basePage.getPageURL();
        });
    };

    /**
     * Verifies the page title matches the expected one
     * @param expectedTitle - expected page title
     */
    verifyPageTitleIs = async (expectedTitle: string) => {
        await test.step(`Verify page title is '${expectedTitle}'`, async () => {
            const currentPageTitle = await this.basePage.getPageTitle();
            expect(currentPageTitle).toEqual(expectedTitle);
        });
    };

    /**
     * Verifies the page is loaded (both Network + DOM)
     */
    verifyPageIsLoaded = async () => {
        await test.step(`Verify the page is loaded`, async () => {
            await this.basePage.waitPageIsLoaded();
        });
    };

    /**
     * Starts to collect all pages' resources files data and collect them in Global variable 'resourceFilesData'
     */
    collectResourceFilesData = async (): Promise<ResourceFileData[]> => {
        return test.step(`Get all resources files data`, async () => {
            return this.basePage.collectResourceFilesData();
        });
    };

    /**
     * Starts collecting all network resources and save them in global variable 'resourceResponses'
     * Do not use more than one time per browser session unless resources are duplicated for each step usage!
     */
    startCollectingAllNetworkResources = async (): Promise<void> => {
        await test.step(`Start collecting resources`, async () => {
            await this.basePage.startCollectingAllNetworkResources();
        });
    };

    /**
     * Verifies all the collected resources in 'resourceFilesData' array are loaded from CDN
     * conditions:
     * - CDN resources response status code = 200
     * - all resources request url contains 'https://download.sisense.com/' substring
     */
    verifyAllResourcesAreLoadedFromCDN = async (): Promise<void> => {
        await test.step(`Verify all resources are loaded from 'CDN'`, () => {
            // check are there any resources collected during test run
            expect(resourceFilesData.length).not.toBe(0);

            // taking all resources that are not from CDN excluding some of them
            const resourcesNotFromCDN: ResourceFileData[] = resourceFilesData.filter(
                (resource) =>
                    !(
                        resource.resourceURL.includes('https://download.sisense.com/') ||
                        resource.resourceURL.includes('vimeocdn') ||
                        resource.resourceURL.includes('spa_plugins') ||
                        resource.resourceURL.includes('sdk_api')
                    ),
            );

            // taking all CDN resources which status code is not 200
            const failedCDNResources: ResourceFileData[] = resourceFilesData.filter(
                (resource) =>
                    resource.resourceURL.includes('https://download.sisense.com/') &&
                    resource.responseCode !== 200,
            );

            // logging into console
            console.log(`Resources collected: ${resourceFilesData.length}`);
            console.log(`Not from CDN resources amount: ${resourcesNotFromCDN.length}`);
            console.log(`Failed CDN resources amount: ${failedCDNResources.length}`);

            if (resourcesNotFromCDN.length !== 0) {
                console.log(`Not from CDN resources list:\n${JSON.stringify(resourcesNotFromCDN)}`);
            }
            if (failedCDNResources.length !== 0) {
                console.log(`Failed CDN resources list:\n${JSON.stringify(failedCDNResources)}`);
            }

            // expect both arrays are empty that means there are no "bad" resources
            expect(
                !resourcesNotFromCDN.length && !failedCDNResources.length,
                'Seems there are resources not from CDN or failed. Please check the console log events.',
            ).toBeTruthy();
        });
    };

    /**
     * Gets recently collected network resources with defined type and part of URL
     * @param resourceFileType - network resource type (xhr, urlToContain, script, etc...)
     * @param urlToContain -  part of the resource URL
     */
    getCollectedNetworkResources = async (
        resourceFileType: ResourceFileType,
        urlToContain: string,
    ): Promise<Response[]> => {
        return test.step(`Get collected '${resourceFileType}' resources which URL contains '${urlToContain}'`, async (): Promise<
            Response[]
        > => {
            const filteredResources: Response[] = filterNetworkResources(
                resourceResponses,
                resourceFileType,
                urlToContain,
            );

            resetResourceResponses();
            return filteredResources;
        });
    };

    /**
     * Logging to (console.warn() all requests that has been failed)
     */
    loggingFailedRequests = async (): Promise<void> => {
        await test.step(`Logging failed requests`, async () => {
            this.basePage.loggingFailedRequests();
        });
    };

    /**
     * Starts collecting all errors in the browser console
     */
    startCollectingBrowserConsoleErrors = async (): Promise<void> => {
        await test.step(`Start collecting errors in the browser console`, async () => {
            await this.basePage.startCollectingBrowserConsoleErrors();
        });
    };

    /**
     * Verifies there are no errors in the browser console
     */
    verifyNoErrorsInBrowserConsole = async () => {
        await test.step(`Verify there are no errors in the browser console`, async () => {
            expect(browserConsoleErrors).toHaveLength(0);
        });
    };

    /**
     * Presses a button with parameters via keyboard
     * [documentation]{@link https://playwright.dev/docs/api/class-keyboard#keyboard-press}
     * @param key       - key button to press
     * @param options
     */
    pressKeyboardButton = async (
        key: string,
        options?: { delay?: number | undefined } | undefined,
    ): Promise<void> => {
        await test.step(`Press '${key}' key on keyboard'`, async () => {
            await this.basePage.pressKey(key, options);
        });
    };

    /**
     * Closes current browser tab
     * If there is only 1 tab - browser will be closed
     */
    closeTab = async () => {
        await test.step(`Close current browser tab`, async () => {
            await this.basePage.closeTab();
        });
    };

    /**
     * Verifies clipboard text
     *  Works only in HTTPS because the Clipboard API requires a secure context.
     *  Use Sisense with SSL enabled
     * @param text
     */
    verifyClipboardText = async (text: string) => {
        await test.step(`Verify clipboard text is '${text}'`, async () => {
            const clipboardText = await this.basePage.getTextFromClipboard();
            await expect(clipboardText).toEqual(text);
        });
    };
}

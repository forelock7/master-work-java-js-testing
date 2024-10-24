import {Cookie, expect, Locator, Page, Request, Response} from '@playwright/test';
import {getFilePassInDownloadsFolder} from '@utils/fileUtils';
import {UserContext} from '@config/userContext';
import {resourceFileTypesExceptXhr} from '@constants/resourceFileType';
import path from 'path';
import {ResourceFileData} from '@models/resourceFileData';

export const resourceFilesData: ResourceFileData[] = [];
export let resourceResponses: Response[] = [];
export let browserConsoleErrors: string[] = [];

export function resetResourceResponses() {
    resourceResponses = [];
}

export class BasePage {
    constructor(
        protected page: Page,
        private inputTypeFile: Locator = page.locator(`input[type='file']`),
    ) {}

    async openURL(url: string): Promise<this> {
        await this.page.goto(url);
        await this.waitPageIsLoaded();
        return this;
    }

    async openByPartURL(
        userContext: UserContext,
        urlSuffix: string,
        waitPageIsLoaded: boolean = true,
    ): Promise<void> {
        await this.page.goto(userContext.baseUrl + urlSuffix);
        if (waitPageIsLoaded) await this.waitPageIsLoaded(2 * 60);
    }

    async reload(): Promise<void> {
        await this.page.reload();
        await this.waitPageIsLoaded();
    }

    async openBaseURL(userContext: UserContext): Promise<void> {
        await this.page.goto(userContext.baseUrl);
        await this.waitPageIsLoaded();
    }

    getPageURL(): string {
        return this.page.url();
    }

    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    async waitPageIsLoaded(timeoutSec: number = 30): Promise<void> {
        await this.page.waitForLoadState('networkidle', { timeout: timeoutSec * 1000 });
    }

    async clickOnElementAndDownloadFile(locator: Locator, filename?: string): Promise<void> {
        const [download] = await Promise.all([
            // Start waiting for the download
            this.page.waitForEvent('download', { timeout: 2 * 60 * 1000 }),
            // Perform the action that initiates download
            locator.click({ timeout: 20 * 1000 }),
        ]);

        const filePath: string = getFilePassInDownloadsFolder(
            filename ?? download.suggestedFilename(),
        );
        // Wait for the download process to complete and save downloaded file
        await download.saveAs(filePath);
    }

    /**
     * Returns page cookies as array
     */
    async getPageCookies(): Promise<Cookie[]> {
        return this.page.context().cookies();
    }

    /**
     * Monitor page for specific URL call
     * @param url
     * @param timeoutSec
     */
    async getResponseByUrl(url: string, timeoutSec: number = 30): Promise<Response> {
        return this.page.waitForResponse(`**/${url}`, {
            timeout: timeoutSec * 1000,
        });
    }

    /**
     * Moves mouse from the current position on provided pixels
     * @param x - absolute X position
     * @param y - absolute Y position
     * @param options - (optional) steps: number - number of steps to use for mouse movement, bigger amount make movement smoother but slower
     */
    async mouseMove(x: number, y: number, options?: { steps: number }): Promise<void> {
        await this.page.mouse.move(x, y, options);
    }

    /**
     * Start collecting all the resources data (filtered by resource type via 'resourceFileTypes')
     * and put the data to 'resourceFilesData' array (Global variable)
     */
    async collectResourceFilesData(): Promise<ResourceFileData[]> {
        const data: ResourceFileData[] = resourceFilesData;

        this.page.on('response', (response) => {
            let resourcePage: string;
            let resourceURL: string;
            let resourceName: string;
            let resourceType: string;
            let responseCode: number;

            if (resourceFileTypesExceptXhr.includes(response.request().resourceType())) {
                resourcePage = this.getPageURL();
                resourceURL = response.request().url();
                resourceName = path.basename(resourceURL).split('?')[0];
                resourceType = response.request().resourceType();
                responseCode = response.status();
                data.push({ resourcePage, resourceName, resourceURL, resourceType, responseCode });
            }
        });
        return data;
    }

    /**
     * Starts collecting all network resources and save them in global variable 'resourceResponses'
     * Do not use more than one time per browser session unless resources are duplicated for each step usage!
     * */
    async startCollectingAllNetworkResources(): Promise<void> {
        this.page.on('response', async (response) => {
            resourceResponses.push(response);
        });
    }

    loggingFailedRequests(): void {
        this.page.on('requestfailed', (failedReq: Request) => {
            console.log(
                `WARNING. Request has been failed:\n${failedReq.method()} ${failedReq.url()}`,
            );
        });
    }

    async startCollectingBrowserConsoleErrors(): Promise<void> {
        this.page.on('pageerror', async (exception) => {
            return browserConsoleErrors.push(exception.message);
        });
        this.page.on('console', async (message) => {
            if (message.type() === 'error') {
                browserConsoleErrors.push(message.text());
            }
        });
    }

    async pressKey(
        key: string,
        options?: { delay?: number | undefined } | undefined,
    ): Promise<void> {
        await this.page.keyboard.press(key, options);
    }

    async waitElementEnabledState(
        locator: Locator,
        enabled: boolean,
        timeoutSec?: number,
    ): Promise<void> {
        await expect(locator).toBeEnabled({
            enabled,
            timeout: timeoutSec ? timeoutSec * 1000 : undefined,
        });
    }

    /**
     * Should be used for getting new Page object on clicking a link that opens a new page on a new tab
     * @param locator - any locator the click is performed on
     */
    async clickLocatorAndGetNewPage(locator: Locator): Promise<Page> {
        // Start waiting for new page before clicking. Note no await.
        const pagePromise: Promise<Page> = this.page.context().waitForEvent('page');
        await locator.click();
        const newPage: Page = await pagePromise;
        await newPage.waitForLoadState();
        return newPage;
    }

    async closeTab(): Promise<void> {
        await this.page.close();
    }

    /**
     * Verifies element's CSS property has expected value
     * @param locator           - element locator
     * @param cssPropertyName   - name of the property
     * @param cssPropertyValue  - value of the property
     */
    async verifyElementPropertyValue(
        locator: Locator,
        cssPropertyName: string,
        cssPropertyValue: string,
    ): Promise<void> {
        await expect(locator).toHaveCSS(cssPropertyName, cssPropertyValue);
    }

    getByAttribute(
        /**
         * Gets Locator by its attribute|value
         * @returns Locator
         */
        attributeName: string,
        attributeValue: string,
        options?:
            | {
                  has?: Locator | undefined;
                  hasNot?: Locator | undefined;
                  hasNotText?: string | RegExp | undefined;
                  hasText?: string | RegExp | undefined;
              }
            | undefined,
    ): Locator {
        return this.page.locator(`[${attributeName}="${attributeValue}"]`, options);
    }

    async getTextFromClipboard() {
        // Works only in HTTPS because the Clipboard API requires a secure context.
        // Use Sisense with SSL enabled
        await this.page.context().grantPermissions(['clipboard-read']);
        return await this.page.evaluate(async () => {
            return await navigator.clipboard.readText();
        });
    }
}

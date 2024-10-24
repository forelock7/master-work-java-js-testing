import {ResourceFileType} from '@constants/resourceFileType';
import {Response} from '@playwright/test';

export const filterNetworkResources = (
    resourceResponses: Response[],
    resourceFileType: ResourceFileType,
    partialUrl: string,
): Response[] => {
    console.log(`Total number of network resources: ${resourceResponses.length}`);
    const filteredResources: Response[] = resourceResponses
        .filter((res) => res.request().resourceType() === resourceFileType)
        .filter((res) => res.request().url().includes(partialUrl));
    console.log(
        `Number of found '${resourceFileType}' network resources: ${filteredResources.length}`,
    );
    return filteredResources;
};

export const getRequestBody = (response: Response): string => {
    return response.request().postData() ?? '';
};

export const getResponseBody = async (response: Response): Promise<string> => {
    const responseBody = await response.body();
    return responseBody.toString();
};

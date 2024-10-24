export enum ResourceFileType {
    IMAGE = 'image',
    STYLESHEET = 'stylesheet',
    MEDIA = 'media',
    FONT = 'font',
    SCRIPT = 'script',
    XHR = 'xhr',
}

export const resourceFileTypes: string[] = Object.values(ResourceFileType);
export const resourceFileTypesExceptXhr: string[] = resourceFileTypes.filter(
    (i) => i !== ResourceFileType.XHR,
);

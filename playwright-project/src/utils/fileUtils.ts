import fs from 'fs';
import Path from 'path';
import path from 'path';
import test from '@playwright/test';
import * as unzipper from 'unzipper';

/**
 * Creates a directory with following name
 * @param directoryPath - directory name
 */
export const createDirectoryRecursively = function (directoryPath: string) {
    // Creates the download directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
        console.log(`Directory created: '${directoryPath}'`);
    }
};

/**
 * Removes following directory with all files in
 * @param directoryPath - directory Path
 */
export const removeDirectoryRecursively = function (directoryPath: string) {
    // Removes the download directory if it exists
    if (fs.existsSync(directoryPath)) {
        fs.rmSync(directoryPath, { recursive: true });
        console.log(`Directory removed: '${directoryPath}'`);
    }
};

export const cleanDirectory = function (directoryPath: string) {
    // Removes all files in the directory
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file) => {
            fs.unlinkSync(`${directoryPath}/${file}`);
        });
        console.log(`Directory cleaned: '${directoryPath}'`);
    }
};

export const getFileExtension = (filename: string) => {
    return filename.split('.').pop();
};

export const getFilenameWithoutExtension = (filename: string) => {
    return filename.slice(0, filename.indexOf('.'));
};

export const attachFileToReport = async (attachmentName: string, filePath: string) => {
    if (fs.existsSync(filePath)) {
        await test.info().attach(attachmentName, { path: filePath });
    }
};

export const getFilePass = (fileName: string, fileDir: string) => {
    return path.join(fileDir, fileName);
};

export const getFilenameWithExtensionFromPath = (filePath: string) => {
    const path = Path.parse(filePath);
    return `${path.name + path.ext}`;
};

export const changeFilePermission = (filePath: string, permission: string) => {
    fs.chmodSync(filePath, permission);
};

/**
 * Created file with content
 * @param filePath      - file path (e.g. /dir/file.pdf or /file.pdf)
 * @param fileContent   - file content encoded with 'base64'
 * @param encoding
 */
export const writeFile = (
    filePath: string,
    fileContent: string | NodeJS.ArrayBufferView,
    encoding: BufferEncoding = 'base64',
): void => {
    fs.writeFileSync(filePath, fileContent, { encoding });
};

export const renameFile = (oldPath: fs.PathLike, newPath: fs.PathLike): void => {
    fs.renameSync(oldPath, newPath);
};

export const readFile = (path: fs.PathLike): Buffer => {
    return fs.readFileSync(path);
};

export async function unzipArchive(filePath: string, pathToDestination: string): Promise<void> {
    const directory = await unzipper.Open.file(filePath);
    await directory.extract({ path: pathToDestination });
}

/**
 * Gets all files and their paths recursively
 * @param dirPath      - root directory
 * @param arrayOfFiles - file's array which is extended during recursion
 */
export function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            // Recursively call getAllFiles for directories
            getAllFiles(filePath, arrayOfFiles);
        } else {
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles;
}

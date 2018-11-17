import * as _ from 'lodash';

// Simplify a mime type as much as we can, without throwing any errors
export const getBaseContentType = (mimeType: string) =>
    (mimeType || '').split(';')[0].split('+')[0];

export type HtkContentType =
    | 'raw'
    | 'text'
    | 'json'
    | 'xml'
    | 'html'
    | 'css'
    | 'javascript'
    | 'markdown'
    | 'yaml'
    | 'image'

export function getHTKContentType(mimeType: string): HtkContentType {
    switch (getBaseContentType(mimeType)) {
        case 'application/json':
        case 'text/json':
            return 'json';

        case 'application/xml':
        case 'text/xml':
            return 'xml';

        case 'text/javascript':
        case 'application/javascript':
        case 'application/x-javascript':
        case 'application/ecmascript':
            return 'javascript';

        case 'text/plain':
        case 'text/csv':
            return 'text';

        case 'text/markdown':
        case 'text/x-markdown':
            return 'markdown';

        case 'text/yaml':
        case 'text/x-yaml':
        case 'application/yaml':
            return 'yaml';

        case 'image/gif':
        case 'image/jpg':
        case 'image/jpeg':
        case 'image/png':
        case 'image/svg':
        case 'image/tiff':
        case 'image/webp':
            return 'image';

        case 'text/css':
            return 'css';

        case 'text/html':
        case 'application/xhtml':
            return 'html';

        default:
            return 'raw';
    }
}

export function getContentTypeName(contentType: HtkContentType): string {
    return _.capitalize(contentType);
}

export function getCompatibleTypes(contentType: HtkContentType): HtkContentType[] {
    let types = [contentType];

    if (!_.includes(['raw', 'image', 'text'], contentType)) {
        types.push('text');
    }

    if (contentType !== 'raw') types.push('raw');

    return types;
}
import { DEFAULT_MAP_IMAGE } from '@/common/constants';
import packageJson from '../../../package.json';

export const getMapImageLink = (link: string | null | undefined) => {
    if (link) {
        return process.env.FILE_STORAGE_URL + '/' + link;
    }
    // NOT FOUND
    return DEFAULT_MAP_IMAGE;
};

export const getAvatarImageLink = (link: string | null | undefined) => {
    if (link) {
        return process.env.FILE_STORAGE_URL + '/' + link;
    }
};

export const createRootContainerElement = (rootContainerClass: string): HTMLDivElement => {
    const element = document.createElement('div');
    element.setAttribute('class', rootContainerClass);
    return document.body.appendChild(element);
};

export const getRootContainerElement = (rootContainerClass: string): Element => {
    const container = document.querySelector(`.${rootContainerClass}`);
    return container ? container : createRootContainerElement(rootContainerClass);
};

export const CommonUtils = {
    getMapImageLink,
};

export const DomUtils = {
    createRootContainerElement,
    getRootContainerElement,
};

export const getAppVersion = () => {
    const appVersion = packageJson.version;

    return `v ${appVersion}`;
};
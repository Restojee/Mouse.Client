import { DEFAULT_MAP_IMAGE } from "@/common/constants";
import packageJson from "../../../package.json";

export const getImageVariant = (variant: string) => {
  return variant ? `_${variant}.jpg` : "";
};

export const getStorageLink = (link: string) => {
  return process.env.FILE_STORAGE_URL + "/" + link;
};

export const getMapImageLink = (link: string | null | undefined, variant: string) => {
  if (!link) {
    return DEFAULT_MAP_IMAGE;
  }
  return getStorageLink(link) + getImageVariant(variant);
};

export const getAvatarImageLink = (link: string | null | undefined, variant: string) => {
  if (!link) {
    return "";
  }
  return getStorageLink(link) + getImageVariant(variant);
};

export const createRootContainerElement = (rootContainerClass: string): HTMLDivElement => {
  const element = document.createElement("div");
  element.setAttribute("class", rootContainerClass);
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

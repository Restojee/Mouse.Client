const getMapImageLink = (link: string | null | undefined) => {
    if (link) {
        return process.env.FILE_STORAGE_URL + "/" + link;
    }
    // NOT FOUND
    return ""
}

export const createRootContainerElement = (rootContainerClass: string) : HTMLDivElement => {
    const element = document.createElement("div");
    element.setAttribute("class", rootContainerClass);
    return document.body.appendChild(element);
}

export const getRootContainerElement = (rootContainerClass: string) : Element => {
    const container = document.querySelector(`.${ rootContainerClass }`);
    return container ? container : createRootContainerElement(rootContainerClass);
};


export const CommonUtils = {
    getMapImageLink,
}

export const DomUtils = {
    createRootContainerElement,
    getRootContainerElement
}
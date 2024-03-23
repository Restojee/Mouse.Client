export function removeKeysFromObject<T extends Record<string, any>>(obj: T, keysToRemove: string[]): Partial<T> {
    if (!obj || typeof obj !== 'object' || !Array.isArray(keysToRemove)) {
        return obj;
    }

    const clonedObject: Partial<T> = { ...obj };

    keysToRemove.forEach((key) => {
        if (key in clonedObject) {
            delete clonedObject[key as keyof T];
        }
    });

    return clonedObject;
}
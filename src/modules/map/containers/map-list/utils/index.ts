export function capitalizeKeys<T>(obj: T): T {
    const result: Partial<T> = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            result[capitalizedKey as keyof T] = obj[key];
        }
    }
    return result as T;
}
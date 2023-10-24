export function parseObjectValues(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'string') {
            if (value.toLowerCase() === 'true') {
                result[key] = true;
            } else if (value.toLowerCase() === 'false') {
                result[key] = false;
            } else {
                const numberValue = parseFloat(value);
                if (!isNaN(numberValue)) {
                    result[key] = numberValue;
                } else {
                    result[key] = value;
                }
            }
        } else {
            result[key] = value;
        }
    }

    return result;
}

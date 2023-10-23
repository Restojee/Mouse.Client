export function gatherValuesByKey<ArrayType extends Record<string, any>, KeyType>(
    arr: ArrayType[],
    key: string
): KeyType[] {
    const values: KeyType[] = [];

    for (const item of arr) {
        if (item.hasOwnProperty(key)) {
            values.push(item[key]);
        }
    }

    return values;
}
export function gatherValuesByKey<ArrayType extends Record<string, never>, KeyType>(
  arr: ArrayType[],
  key: string,
): KeyType[] {
  const values: KeyType[] = [];

  for (const item of arr) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      values.push(item[key]);
    }
  }

  return values;
}

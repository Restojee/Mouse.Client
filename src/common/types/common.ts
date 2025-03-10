export type Callback<A extends [] | undefined = undefined, R = void> = (...args: A) => R;

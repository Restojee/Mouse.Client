export type TokenProvider = {
    setToken: (token: string) => void;
    getToken: () => string;
    isHasToken: boolean;
}

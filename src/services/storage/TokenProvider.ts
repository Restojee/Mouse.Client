export type TokenProvider = {
    setToken: (token: string) => void;
    getToken: () => string | null;
    isHasToken: boolean;
}

import { TokenProvider } from "@/services/storage/TokenProvider";

export const makeAccessTokenProvider = (options?: { storageKey: string }): TokenProvider => {

    let storageKey = options?.storageKey ? options.storageKey : "access_token";

    return {
        getToken(): string {
            return localStorage.getItem(storageKey) || "";
        },

        get isHasToken(): boolean {
            return !!this.getToken();
        },

        setToken(refreshToken: string): void {
            localStorage.setItem(storageKey, refreshToken);
        }
    }
}


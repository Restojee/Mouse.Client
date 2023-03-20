import { TokenProvider } from "@/services/storage/TokenProvider";

export const makeTokenProvider = (options: { storageKey: string }): TokenProvider => {

    let storageKey = options.storageKey;

    return {
        getToken(){
            return localStorage.getItem(storageKey);
        },

        get isHasToken() {
            return !!this.getToken();
        },

        setToken(refreshToken: string) {
            localStorage.setItem(storageKey, refreshToken);
        }
    }
}


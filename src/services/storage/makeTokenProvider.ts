import { TokenProvider } from "@/services/storage/TokenProvider";

export const makeTokenProvider = (options: { storageKey: string }): TokenProvider => {
  const storageKey = options.storageKey;

  return {
    getToken() {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(storageKey);
    },

    get isHasToken() {
      return !!this.getToken();
    },

    setToken(refreshToken: string) {
      if (typeof window === "undefined") return;
      localStorage.setItem(storageKey, refreshToken);
    },
  };
};

import { makeTokenProvider } from "@/services/storage";

const accessTokenProvider = makeTokenProvider({ storageKey: "access_token" });
const refreshTokenProvider = makeTokenProvider({ storageKey: "refresh_token" });

export { accessTokenProvider, refreshTokenProvider };

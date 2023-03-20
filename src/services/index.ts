import { makeAccessTokenProvider, makeRefreshTokenProvider } from "@/services/storage";

const accessTokenProvider = makeAccessTokenProvider();
const refreshTokenProvider = makeRefreshTokenProvider();

export {
    accessTokenProvider,
    refreshTokenProvider
}
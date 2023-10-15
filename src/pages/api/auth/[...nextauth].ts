import NextAuth, { NextAuthOptions } from "next-auth"
import {JWT} from "next-auth/jwt";

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

async function refreshAccessToken(token: JWT) {
    try {

        console.log(token.refreshToken)

        const url =
          "http://api.tfm-maps.ru/api/oauth2/token?" +
          new URLSearchParams({
              client_id: 'messaging-client',
              client_secret: 'secret',
              grant_type: "refresh_token",
              refresh_token: token.refreshToken as string,
          })

        const response = await fetch(url, {
            headers: {
                Authorization: 'Basic ' + btoa(`messaging-client:secret`),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        })

        const refreshedTokens = await response.json()

        if (!response.ok) {
            throw refreshedTokens
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }
    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        {
            id: "mouse-auth",
            name: "Mouse Auth",
            type: "oauth",
            wellKnown: "http://api.tfm-maps.ru/api/.well-known/openid-configuration",
            authorization: { params: { scope: "openid" } },
            idToken: true,
            clientId: "messaging-client",
            clientSecret: "secret",
            checks: ["pkce", "state"],
            profile(profile) {
                return {
                    id: profile?.sub,
                    name: profile?.name,
                    email: profile?.email,
                    image: profile?.picture,
                }
            },
        }
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                return token
            }

            // @ts-ignore
            if (Date.now() < token.accessTokenExpires) {
                return token
            }

            return refreshAccessToken(token)
        },
        async session({ session, token, user }) {
            //warning raised here
            session.accessToken = token.accessToken
            return session
        },

    }
}


export default NextAuth(authOptions)

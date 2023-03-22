import NextAuth, { NextAuthOptions } from "next-auth"

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

export const authOptions: NextAuthOptions = {
    providers: [
        {
            id: "mouse-auth",
            name: "Mouse Auth",
            type: "oauth",
            wellKnown: "http://tfm-maps.ru:8001/api/.well-known/openid-configuration",
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
    session: {
        strategy: "jwt",
        maxAge: THIRTY_DAYS,
        updateAge: THIRTY_MINUTES,
    },
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            console.log(token);
            return token
        },
        async session({ session, token, user }) {
            //warning raised here
            session.accessToken = token.accessToken
            return session
        }
    }
}


export default NextAuth(authOptions)
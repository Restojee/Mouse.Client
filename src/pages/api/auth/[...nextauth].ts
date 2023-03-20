import NextAuth, { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [
        {
            id: "mouse-auth",
            name: "Mouse Auth",
            type: "oauth",
            wellKnown: "http://mouse-maps.ru:8001/api/.well-known/openid-configuration",
            authorization: { params: { scope: "openid" } },
            idToken: true,
            clientId: "messaging-client",
            checks: ["state"],
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
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            alert(token);
            return token
        }
    }
}


export default NextAuth(authOptions)

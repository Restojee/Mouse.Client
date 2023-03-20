import { ReactElement } from "react";
import { accessTokenProvider } from "@/services";
import { useSession } from "next-auth/react";

type AuthProviderProps = {
    children: ReactElement;
}
export const AuthProvider = (props: AuthProviderProps) => {
    const session = useSession();

    console.log(session.data?.accessToken);

    if (session.data?.accessToken) {
        accessTokenProvider.setToken(session.data.accessToken)
    }

    return props.children;
}
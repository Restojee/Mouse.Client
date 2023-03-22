import { ReactElement } from "react";
import { accessTokenProvider } from "@/services";
import { useSession } from "next-auth/react";

type AuthProviderProps = {
    children: ReactElement;
}
export const AuthProvider = (props: AuthProviderProps) => {
    const session = useSession();

    return props.children;
}
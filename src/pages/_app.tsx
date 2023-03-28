import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { wrapper } from "@/store";
import { ThemeProvider } from "@/layout/theme/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import {AuthProvider} from "@/modules/auth/AuthProvider";
import Notification from "@/ui/Notification/Notification";

export default function App ({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        // @ts-ignore
        <SessionProvider session={ rest.session }>
            <Provider store={ store }>
                <AuthProvider>
                    <ThemeProvider>
                        <Component {...props.pageProps} />
                        <Notification/>
                    </ThemeProvider>
                </AuthProvider>
            </Provider>
        </SessionProvider>
    );
}
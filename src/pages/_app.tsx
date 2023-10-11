import { LayoutProvider } from '@/layout/common/LayoutProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { wrapper } from "@/store";
import { ThemeProvider } from "@/layout/theme/ThemeProvider";
import { SessionProvider } from "next-auth/react";

import { mapsApi } from "@/api/mapsApi";
import { AppProps } from "next/app";
import { Session } from "next-auth";
import { AuthProvider } from "@/modules/auth/AuthProvider";
import Notification from "@/ui/Notification/Notification";
import "@/styles/globals.css"

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    const props = {};
    await store.dispatch(mapsApi.endpoints.getMaps.initiate({ page: 0, size: 20 }));
    return { props }
});

export default function App ({ Component, ...rest }: AppProps<{ session: Session }>) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = rest;
    return (
        <SessionProvider session={ pageProps.session }>
            <Provider store={ store }>
                <AuthProvider>
                    <ThemeProvider>
                        <LayoutProvider>
                            <Component {...props.pageProps} />
                        </LayoutProvider>
                        <Notification/>
                    </ThemeProvider>
                </AuthProvider>
            </Provider>
        </SessionProvider>
    );
}
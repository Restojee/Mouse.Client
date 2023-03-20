import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { wrapper } from "@/store";
import { ThemeProvider } from "@/layout/theme/ThemeProvider";
import { AuthProvider } from "@/modules/auth/AuthProvider";

export default function App ({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={ store }>
            <AuthProvider>
                <ThemeProvider>
                    <Component {...props.pageProps} />
                </ThemeProvider>
            </AuthProvider>
        </Provider>
    );
}
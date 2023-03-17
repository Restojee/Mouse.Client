import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { wrapper } from "@/store";
import { ThemeProvider } from "@/layout/theme/ThemeProvider";

export default function App ({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={ store }>
            <ThemeProvider>
                <Component {...props.pageProps} />
            </ThemeProvider>
        </Provider>
    );
}
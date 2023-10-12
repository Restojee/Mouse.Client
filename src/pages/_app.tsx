import React from 'react';
import { getMapsThunk } from '@/modules/map/containers/map-list/slice';
import { LayoutProvider } from '@/layout/common/LayoutProvider';
import { Provider } from 'react-redux';
import { wrapper } from '@/store';
import { ThemeProvider } from '@/layout/theme/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { AuthProvider } from '@/modules/auth/AuthProvider';
import Notification from '@/ui/Notification/Notification';
import '@/styles/globals.css';

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    const props = {};
    return { props };
});


export default function App({ Component, ...rest }: AppProps<{ session: Session }>) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = rest;

    return (
        <SessionProvider session={pageProps.session}>
            <Provider store={store}>
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
import React from 'react';
import { LayoutProvider } from '@/layout/common/LayoutProvider';
import { Provider } from 'react-redux';
import { RootState, wrapper } from '@/store';
import { ThemeProvider } from '@/layout/theme/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { AuthProvider } from '@/modules/auth/AuthProvider';
import Notification from '@/ui/Notification/Notification';
import '@/styles/globals.css';

function App({ Component, ...rest }: AppProps<{ session: Session, initialState: RootState }>) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = rest;

    return (
        <Provider serverState={pageProps.initialState} store={store}>
            <SessionProvider session={pageProps.session}>
                <AuthProvider>
                    <ThemeProvider>
                        <LayoutProvider>
                            <Component {...props.pageProps} />
                        </LayoutProvider>
                        <Notification/>
                    </ThemeProvider>
                </AuthProvider>
            </SessionProvider>
        </Provider>
    );
}

export default App;
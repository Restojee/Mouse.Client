import { LayoutProvider } from "@/layout/common/LayoutProvider";
import { AuthProvider } from "@/modules/auth/AuthProvider";
import { RootState, wrapper } from "@/store";
import "@/styles/globals.css";
import Notification from "@/ui/Notification/Notification";
import { Session } from "next-auth";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React from "react";
import { Provider } from "react-redux";

const ThemeProvider = dynamic(() => import("@/layout/theme/ThemeProvider"), { ssr: false });

function App({ Component, ...rest }: AppProps<{ session: Session; initialState: RootState }>) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = rest;

  return (
    <Provider
      serverState={pageProps.initialState}
      store={store}
    >
      <AuthProvider>
        <ThemeProvider>
          <LayoutProvider>
            <Component {...props.pageProps} />
          </LayoutProvider>
          <Notification />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;

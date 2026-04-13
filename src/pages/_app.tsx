import { LayoutProvider } from "@/layout/common/LayoutProvider";
import { AuthProvider } from "@/modules/auth/AuthProvider";
import { RootState, wrapper } from "@/store";
import "@/styles/globals.scss";
import Notification from "@/ui/Notification/Notification";
import { SheetHost } from "@/ui/Sheet/view/SheetHost";
import { Session } from "next-auth";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React from "react";
import { Provider } from "react-redux";
import { PopupProvider } from "@/ui/Popup/PopupContext";
import Maps from "@/pages/index";

const ThemeProvider = dynamic(() => import("@/layout/theme/ThemeProvider"), { ssr: false });

function App({ Component: _Component, ...rest }: AppProps<{ session: Session; initialState: RootState }>) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = rest;

  return (
    <Provider
      serverState={pageProps.initialState}
      store={store}
    >
      <SheetHost />
      <PopupProvider>
        <AuthProvider>
          <ThemeProvider>
            <LayoutProvider>
              <Maps {...props.pageProps} />
            </LayoutProvider>
            <Notification />
          </ThemeProvider>
        </AuthProvider>
      </PopupProvider>
    </Provider>
  );
}

export default App;

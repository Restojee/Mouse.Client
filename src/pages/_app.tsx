import { LayoutProvider } from "@/layout/common/LayoutProvider";
import ThemeProvider from "@/layout/theme/ThemeProvider";
import { AuthProvider } from "@/modules/auth/AuthProvider";
import { RootState, wrapper } from "@/store";
import "@/styles/globals.scss";
import ImageModal from "@/ui/ImageModal";
import Notification from "@/ui/Notification/Notification";
import { PopupProvider } from "@/ui/Popup/PopupContext";
import { SheetHost } from "@/ui/Sheet/view/SheetHost";
import { Session } from "next-auth";
import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session; initialState: RootState }> & {
  Component: NextPageWithLayout;
};

function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider
      serverState={pageProps.initialState}
      store={store}
    >
      <SheetHost />
      <PopupProvider>
        <AuthProvider>
          <ThemeProvider>
            <LayoutProvider>{getLayout(<Component {...pageProps} />)}</LayoutProvider>
            <Notification />
            <ImageModal />
          </ThemeProvider>
        </AuthProvider>
      </PopupProvider>
    </Provider>
  );
}

export default App;

import * as React from 'react';
import { Theme } from "@common/themes/core/Theme";
import Palette from "@common/themes/core/Pallete";
import { Layout } from "@common/containers/Layout";
import withModule from "@common/hocs/withModule";
import LevelsModule from "@/modules/levels/view";
import { PaletteInjectKey, ThemeInjectKey } from "@common/themes/common/constants";
import HttpConfig from "@common/http/HttpConfig";
import { HttpHandler } from "@common/http/HttpHandler";
import { HttpConfigInjectKey, HttpHandlerInjectKey } from "@common/http/constants";

const App: React.FC = () => {
  return (
    <Layout>
      <LevelsModule />
    </Layout>
  )
}

export default withModule({
  key: 'AppModule',
  component: App,
  providers: [
    {
      key: ThemeInjectKey,
      provide: Theme
    },
    {
      key: PaletteInjectKey,
      provide: Palette
    },
    {
      key: HttpConfigInjectKey,
      provide: HttpConfig,
      useFactory() {
        const httpConfig = new HttpConfig();
        httpConfig.setConfig({
          url: 'url',
          getToken: () => 'token'
        })
        return httpConfig;
      }
    },
    {
      key: HttpHandlerInjectKey,
      provide: HttpHandler
    },
  ]
})

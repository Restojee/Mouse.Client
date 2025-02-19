import * as React from 'react';
import withModule from "@common/hocs/withModule";
import { Theme, ThemeInjectKey } from "@common/themes/core/Theme";
import Palette, { PaletteInjectKey } from "@common/themes/core/Pallete";
import { ModalService, ModalServiceInjectKey } from "@common/services/modal/ModalService";
import { HttpHandler, HttpInjectKey } from "@common/http/HttpHandler";
import { Layout } from "@common/containers/Layout";
import LevelsModule from "@/modules/levels/view";

export interface AppProps {
  [ThemeInjectKey]: Theme
  [PaletteInjectKey]: Palette,
  [ModalServiceInjectKey]: ModalService,
  [HttpInjectKey]: HttpHandler,
}

const App: React.FC<AppProps> = (props) => {
  console.log('app', props);
  return (
    <Layout>
      <LevelsModule />
    </Layout>
  )
}

export default withModule<AppProps>({
  container: App,
  key: 'ServicesInjectKey',
  services: {
    [ThemeInjectKey]: Theme,
    [PaletteInjectKey]: Palette,
    [ModalServiceInjectKey]: ModalService,
    [HttpInjectKey]: HttpHandler,
  }
});

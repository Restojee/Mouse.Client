import * as React from 'react';
import { Theme } from "@common/themes/core/Theme";
import Palette from "@common/themes/core/Pallete";
import { Layout } from "@common/containers/Layout";
import withModule from "@common/hocs/withModule";
import LevelsModule from "@/modules/levels/view";
import { ExamplePage } from "@/modules/example";
import { PaletteInjectKey, ThemeInjectKey } from "@common/themes/common/constants";
import HttpConfig from "@common/http/HttpConfig";
import { HttpHandler } from "@common/http/HttpHandler";
import { HttpConfigInjectKey, HttpHandlerInjectKey } from "@common/http/constants";
import { HistoryServiceInjectKey } from "@common/services/router/common/constants";
import HistoryService from "@common/services/router/HistoryService";
import { observer } from "mobx-react-lite";
import { Column } from "@common/components/Layout";
import { ExampleNavigation, CurrentPage } from "@common/components/ExampleNavigation";

const App: React.FC = observer(() => {
  const [currentPage, setCurrentPage] = React.useState<CurrentPage>('levels');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'example':
        return <ExamplePage initialTitle="🎯 Эталонный MVVM компонент" maxCount={15} />;
      case 'levels':
      default:
        return <LevelsModule />;
    }
  };

  return (
    <Column>
      {/* Фиксированная навигация */}
      <ExampleNavigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Основной контент с отступом сверху */}
      <Column>
        <Layout>
          {renderCurrentPage()}
        </Layout>
      </Column>
    </Column>
  );
})

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
      provide: HttpConfig
    },
    {
      key: HttpHandlerInjectKey,
      provide: HttpHandler
    },
    {
      key: HistoryServiceInjectKey,
      provide: HistoryService
    },
  ]
})

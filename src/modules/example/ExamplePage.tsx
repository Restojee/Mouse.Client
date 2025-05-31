import * as React from "react";
import { useTranslation } from "react-i18next";
import withModule from "@common/hocs/withModule";
import { ExampleView } from "./view/ExampleView";
import { ExampleViewModel } from "./model/ExampleViewModel";
import { Column, Center } from "@common/components/Layout";
import { Theme } from "@common/themes/core/Theme";
import Palette from "@common/themes/core/Pallete";
import { PaletteInjectKey, ThemeInjectKey } from "@common/themes/common/constants";
import { NavigationBar, Documentation } from "./components";
import { DIScope } from "@common/hocs/types";

import "./view/ExampleView.scss";

interface ExamplePageProps {
  initialTitle?: string;
  maxCount?: number;
}

const ExamplePageComponent: React.FC<ExamplePageProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Column gap="lg" pa="lg" width={1}>
      {/* Навигация */}
      <NavigationBar />

      {/* Основной контент */}
      <Center width={1}>
        <ExampleView 
          initialTitle={props.initialTitle || t('Example.MainContent.InitialTitle')}
          maxCount={props.maxCount || 10}
        />
      </Center>
      
      {/* Документация */}
      <Documentation />
    </Column>
  );
};

// Создаем модуль с DI контейнером
export const ExamplePage = withModule({
  key: "ExampleModule",
  component: ExamplePageComponent,
  scope: DIScope.Local,
  providers: [
    {
      key: "ExampleViewModel", 
      provide: ExampleViewModel
    },
  ]
}); 

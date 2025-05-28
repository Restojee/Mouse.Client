import * as React from "react";
import { useTranslation } from "react-i18next";
import withModule from "@common/hocs/withModule";
import { ExampleView } from "./view/ExampleView";
import { ExampleViewModel } from "./model/ExampleViewModel";
import { Button } from "@common/components/Button";
import { Typography } from "@common/components/Typography";
import { Paper, Row, Column, Stack, Flex, Center, Grid } from "@common/components/Layout";
import { TextTags } from "@common/constants/textTags";
import { Theme } from "@common/themes/core/Theme";
import Palette from "@common/themes/core/Pallete";
import { PaletteInjectKey, ThemeInjectKey } from "@common/themes/common/constants";

import "./view/ExampleView.scss";

interface ExamplePageProps {
  initialTitle?: string;
  maxCount?: number;
}

const ExamplePageComponent: React.FC<ExamplePageProps> = (props) => {
  const { t } = useTranslation();

  const renderDocumentationSection = (
    titleKey: string,
    itemsKeys: { labelKey: string; descriptionKey: string }[],
    bgColor: "paletteBackgroundStatusInfoDark" | "paletteBackgroundStatusSuccessDark" | "paletteBackgroundColorsIndigoDark" | "paletteBackgroundStatusDangerDark"
  ) => (
    <Paper bgColor={bgColor} radius="md">
      <Flex direction="column" gap="sm" pa="md">
        <Typography 
          tag={TextTags.H3} 
          color="paletteTextOnColor"
        >
          {t(titleKey)}
        </Typography>
        <Column gap="md">
          {itemsKeys.map((item, index) => (
            <Typography key={index} fontSize="typographyTextNormalFontSize" color="paletteTextOnColor">
              <Typography fontSize="typographyTextNormalFontSize" fontWeight="bold" color="paletteTextOnColor">
                {item.labelKey.startsWith('@') ? item.labelKey : t(item.labelKey)}
              </Typography> - {t(item.descriptionKey)}
            </Typography>
          ))}
        </Column>
      </Flex>
    </Paper>
  );

  return (
    <Column gap="lg" pa="lg" width="100%">
      {/* Навигация */}
      <Paper bgColor="paletteBackgroundStatusInfoDark" radius="md">
        <Flex pa="md" justify="between" align="center" width="100%">
          <Button 
            label={t('Example.Navigation.BackButton')}
            color="paletteTextOnColor"
            bgColor="paletteBackgroundStatusDangerDark"
            onClick={() => window.history.back()}
          />
          
          <Typography 
            fontSize="typographyH2FontSize" 
            color="paletteTextOnColor"
            fontWeight="bold"
          >
            {t('Example.Navigation.Title')}
          </Typography>
        </Flex>
      </Paper>

      {/* Основной контент */}
      <Center width="100%">
        <ExampleView 
          initialTitle={props.initialTitle || t('Example.MainContent.InitialTitle')}
          maxCount={props.maxCount || 10}
        />
      </Center>
      
      {/* Документация */}
      <Paper bgColor="paletteBackgroundColorsPurpleDark" radius="md">
        <Flex direction="column" pa="lg" gap="lg">
          <Typography 
            tag={TextTags.H2} 
            fontSize="typographyH1FontSize" 
            color="paletteTextOnColor"
            fontWeight="bold"
          >
            {t('Example.Documentation.Title')}
          </Typography>
          
          <Grid gap="lg" autoFit minColumnWidth="300">
            {renderDocumentationSection(
              'Example.Documentation.Architecture.Title',
              [
                { labelKey: 'withView HOC', descriptionKey: 'Example.Documentation.Architecture.WithViewHOC' },
                { labelKey: 'withModule HOC', descriptionKey: 'Example.Documentation.Architecture.WithModuleHOC' },
                { labelKey: 'MobX реактивность', descriptionKey: 'Example.Documentation.Architecture.MobXReactivity' },
                { labelKey: 'Decorator Pattern', descriptionKey: 'Example.Documentation.Architecture.DecoratorPattern' }
              ],
              "paletteBackgroundStatusInfoDark"
            )}
            
            {renderDocumentationSection(
              'Example.Documentation.Decorators.Title',
              [
                { labelKey: '@State()', descriptionKey: 'Example.Documentation.Decorators.State' },
                { labelKey: '@Computed()', descriptionKey: 'Example.Documentation.Decorators.Computed' },
                { labelKey: '@Action()', descriptionKey: 'Example.Documentation.Decorators.Action' },
                { labelKey: '@Prop()', descriptionKey: 'Example.Documentation.Decorators.Prop' }
              ],
              "paletteBackgroundStatusSuccessDark"
            )}
            
            {renderDocumentationSection(
              'Example.Documentation.Lifecycle.Title',
              [
                { labelKey: '@OnMounted()', descriptionKey: 'Example.Documentation.Lifecycle.OnMounted' },
                { labelKey: '@OnWatch()', descriptionKey: 'Example.Documentation.Lifecycle.OnWatch' },
                { labelKey: '@OnDestroy()', descriptionKey: 'Example.Documentation.Lifecycle.OnDestroy' },
                { labelKey: 'Example.Documentation.Lifecycle.AutomaticDI', descriptionKey: 'Example.Documentation.Lifecycle.AutomaticDI' }
              ],
              "paletteBackgroundColorsIndigoDark"
            )}
            
            {renderDocumentationSection(
              'Example.Documentation.Advantages.Title',
              [
                { labelKey: 'Example.Documentation.Advantages.Declarative', descriptionKey: 'Example.Documentation.Advantages.Declarative' },
                { labelKey: 'Example.Documentation.Advantages.Automation', descriptionKey: 'Example.Documentation.Advantages.Automation' },
                { labelKey: 'Example.Documentation.Advantages.Separation', descriptionKey: 'Example.Documentation.Advantages.Separation' },
                { labelKey: 'Example.Documentation.Advantages.Testability', descriptionKey: 'Example.Documentation.Advantages.Testability' }
              ],
              "paletteBackgroundStatusDangerDark"
            )}
          </Grid>
          
          <Paper bgColor="paletteBackgroundColorsTealDark" radius="md">
            <Flex direction="column" gap="sm" pa="md">
              <Typography 
                tag={TextTags.H4} 
                color="paletteTextOnColor"
              >
                {t('Example.Documentation.HowToUse.Title')}
              </Typography>
              <Column gap="xs">
                <Typography fontSize="typographyTextNormalFontSize" color="paletteTextOnColor">
                  1. {t('Example.Documentation.HowToUse.Step1')}
                </Typography>
                <Typography fontSize="typographyTextNormalFontSize" color="paletteTextOnColor">
                  2. {t('Example.Documentation.HowToUse.Step2')}
                </Typography>
                <Typography fontSize="typographyTextNormalFontSize" color="paletteTextOnColor">
                  3. {t('Example.Documentation.HowToUse.Step3')}
                </Typography>
                <Typography fontSize="typographyTextNormalFontSize" color="paletteTextOnColor">
                  4. {t('Example.Documentation.HowToUse.Step4')}
                </Typography>
              </Column>
            </Flex>
          </Paper>
        </Flex>
      </Paper>
    </Column>
  );
};

// Создаем модуль с DI контейнером
export const ExamplePage = withModule({
  key: "ExampleModule",
  component: ExamplePageComponent,
  providers: [
    {
      key: "ExampleViewModel", 
      provide: ExampleViewModel
    },
    {
      key: ThemeInjectKey,
      provide: Theme
    },
    {
      key: PaletteInjectKey,
      provide: Palette
    }
  ]
}); 

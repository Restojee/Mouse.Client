import * as React from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@common/components/Typography";
import { Paper, Flex, Grid, Column } from "@common/components/Layout";
import { TextTags } from "@common/constants/textTags";
import { DocumentationSection, DocumentationItem } from "./DocumentationSection";
import { HowToUseGuide } from "./HowToUseGuide";

export interface DocumentationProps {
  sections?: {
    titleKey: string;
    items: DocumentationItem[];
    bgColor: "paletteBackgroundStatusInfoDark" | "paletteBackgroundStatusSuccessDark" | "paletteBackgroundColorsIndigoDark" | "paletteBackgroundStatusDangerDark";
  }[];
}

export const Documentation: React.FC<DocumentationProps> = ({
  sections = [
    {
      titleKey: 'Example.Documentation.Architecture.Title',
      items: [
        { labelKey: 'withView HOC', descriptionKey: 'Example.Documentation.Architecture.WithViewHOC' },
        { labelKey: 'withModule HOC', descriptionKey: 'Example.Documentation.Architecture.WithModuleHOC' },
        { labelKey: 'MobX реактивность', descriptionKey: 'Example.Documentation.Architecture.MobXReactivity' },
        { labelKey: 'Decorator Pattern', descriptionKey: 'Example.Documentation.Architecture.DecoratorPattern' }
      ],
      bgColor: "paletteBackgroundStatusInfoDark"
    },
    {
      titleKey: 'Example.Documentation.Decorators.Title',
      items: [
        { labelKey: '@State()', descriptionKey: 'Example.Documentation.Decorators.State' },
        { labelKey: '@Computed()', descriptionKey: 'Example.Documentation.Decorators.Computed' },
        { labelKey: '@Action()', descriptionKey: 'Example.Documentation.Decorators.Action' },
        { labelKey: '@Prop()', descriptionKey: 'Example.Documentation.Decorators.Prop' }
      ],
      bgColor: "paletteBackgroundStatusSuccessDark"
    },
    {
      titleKey: 'Example.Documentation.Lifecycle.Title',
      items: [
        { labelKey: '@OnMounted()', descriptionKey: 'Example.Documentation.Lifecycle.OnMounted' },
        { labelKey: '@OnWatch()', descriptionKey: 'Example.Documentation.Lifecycle.OnWatch' },
        { labelKey: '@OnDestroy()', descriptionKey: 'Example.Documentation.Lifecycle.OnDestroy' },
        { labelKey: 'Example.Documentation.Lifecycle.AutomaticDI', descriptionKey: 'Example.Documentation.Lifecycle.AutomaticDI' }
      ],
      bgColor: "paletteBackgroundColorsIndigoDark"
    },
    {
      titleKey: 'Example.Documentation.Advantages.Title',
      items: [
        { labelKey: 'Example.Documentation.Advantages.Declarative', descriptionKey: 'Example.Documentation.Advantages.Declarative' },
        { labelKey: 'Example.Documentation.Advantages.Automation', descriptionKey: 'Example.Documentation.Advantages.Automation' },
        { labelKey: 'Example.Documentation.Advantages.Separation', descriptionKey: 'Example.Documentation.Advantages.Separation' },
        { labelKey: 'Example.Documentation.Advantages.Testability', descriptionKey: 'Example.Documentation.Advantages.Testability' }
      ],
      bgColor: "paletteBackgroundStatusDangerDark"
    }
  ]
}) => {
  const { t } = useTranslation();

  return (
    <Paper bgColor="paletteBackgroundColorsPurpleDark" radius="md">
      <Column pa="lg" gap="lg" height="100%">
        <Typography 
          tag={TextTags.H2} 
          fontSize="typographyH1FontSize" 
          color="paletteTextOnColor"
          fontWeight="bold"
        >
          {t('Example.Documentation.Title')}
        </Typography>
        
        <Grid gap="lg" autoFit minColumnWidth="300">
          {sections.map((section, index) => (
            <DocumentationSection
              key={index}
              titleKey={section.titleKey}
              items={section.items}
              bgColor={section.bgColor}
            />
          ))}
        </Grid>
        
        <HowToUseGuide />
      </Column>
    </Paper>
  );
}; 

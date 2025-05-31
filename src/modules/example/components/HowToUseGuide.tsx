import * as React from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@common/components/Typography";
import { Paper, Column, Flex } from "@common/components/Layout";
import { TextTags } from "@common/constants/textTags";

export interface HowToUseGuideProps {
  titleKey?: string;
  stepsKeys?: string[];
}

export const HowToUseGuide: React.FC<HowToUseGuideProps> = ({
  titleKey = 'Example.Documentation.HowToUse.Title',
  stepsKeys = [
    'Example.Documentation.HowToUse.Step1',
    'Example.Documentation.HowToUse.Step2',
    'Example.Documentation.HowToUse.Step3',
    'Example.Documentation.HowToUse.Step4'
  ]
}) => {
  const { t } = useTranslation();

  return (
    <Paper bgColor="paletteBackgroundColorsTealDark" radius="md">
      <Flex direction="column" gap="sm" pa="md">
        <Typography 
          tag={TextTags.H4} 
          color="paletteTextOnColor"
        >
          {t(titleKey)}
        </Typography>
        <Column gap="xs">
          {stepsKeys.map((stepKey, index) => (
            <Typography 
              key={index} 
              fontSize="typographyTextNormalFontSize" 
              color="paletteTextOnColor"
            >
              {index + 1}. {t(stepKey)}
            </Typography>
          ))}
        </Column>
      </Flex>
    </Paper>
  );
}; 
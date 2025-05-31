import * as React from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@common/components/Typography";
import { Paper, Column, Flex } from "@common/components/Layout";
import { TextTags } from "@common/constants/textTags";

export interface DocumentationItem {
  labelKey: string;
  descriptionKey: string;
}

export interface DocumentationSectionProps {
  titleKey: string;
  items: DocumentationItem[];
  bgColor: "paletteBackgroundStatusInfoDark" | "paletteBackgroundStatusSuccessDark" | "paletteBackgroundColorsIndigoDark" | "paletteBackgroundStatusDangerDark" | "paletteBackgroundColorsTealDark";
}

export const DocumentationSection: React.FC<DocumentationSectionProps> = ({
  titleKey,
  items,
  bgColor
}) => {
  const { t } = useTranslation();

  return (
    <Paper bgColor={bgColor} radius="md">
      <Flex direction="column" gap="sm" pa="md">
        <Typography 
          tag={TextTags.H3} 
          color="paletteTextOnColor"
        >
          {t(titleKey)}
        </Typography>
        <Column gap="md">
          {items.map((item, index) => (
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
}; 
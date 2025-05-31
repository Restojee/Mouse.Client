import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@common/components/Button";
import { Typography } from "@common/components/Typography";
import { Paper, Flex } from "@common/components/Layout";
import { TextTags } from "@common/constants/textTags";

export interface NavigationBarProps {
  onBack?: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ 
  onBack = () => window.history.back() 
}) => {
  const { t } = useTranslation();

  return (
    <Paper bgColor="paletteBackgroundStatusInfoDark" radius="md">
      <Flex pa="md" justify="between" align="center" width="100%">
        <Button 
          label={t('Example.Navigation.BackButton')}
          color="paletteTextOnColor"
          bgColor="paletteBackgroundStatusDangerDark"
          onClick={onBack}
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
  );
}; 
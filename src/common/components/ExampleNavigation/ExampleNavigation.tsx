import * as React from "react";
import { Flex, Center, Paper, Row } from "@ui/Layout";
import { Fixed } from "@common/components/FloatingContainer";
import { Button } from "@common/components/Button";
import clsx from "clsx";
import styles from "./ExampleNavigation.module.scss";

export type CurrentPage = 'levels' | 'example';

interface ExampleNavigationProps {
  currentPage: CurrentPage;
  onPageChange: (page: CurrentPage) => void;
}

const ExampleNavigation: React.FC<ExampleNavigationProps> = ({ currentPage, onPageChange }) => {
  return (
    <Fixed 
      bottom={0}
      left="50%" 
      centered
      zIndex={1000}
      width="auto"
      maxWidth="1200px"
    >
      <Paper
        className={styles.ExampleNavigation}
        bgColor="paletteBackgroundStatusInfoDark"
        radius="none"
      >
        <Center pa="md">
          <Row gap="sm" justify="center" direction="row">
            <Button
              label="📊 Levels Module"
              color="paletteTextOnColor"
              border="borderThinNormal"
              borderRadius="layoutBorderRadiusMd"
              padding="12px 20px"
              fontSize="typographyTextNormalFontSize"
              fontWeight="medium"
              isActive={currentPage === 'levels'}
              activeBorderColor="paletteBorderActive"
              hoverBorderColor="borderButtonLightHover"
              hoverTransform="translateY(-1px)"
              bgColor="paletteBackgroundColorsIndigoDark"
              activeBgColor="paletteBackgroundStatusDangerDark"
              onClick={() => onPageChange('levels')}
            />
            
            <Button
              label="🎯 MVVM Example"
              color="paletteTextOnColor"
              border="borderButtonLight"
              borderRadius="layoutBorderRadiusMd"
              padding="12px 20px"
              fontSize="typographyTextNormalFontSize"
              fontWeight="medium"
              isActive={currentPage === 'example'}
              activeBorderColor="paletteBorderActive"
              hoverBorderColor="borderButtonLightHover"
              hoverTransform="translateY(-1px)"
              bgColor="paletteBackgroundColorsIndigoDark"
              activeBgColor="paletteBackgroundStatusDangerDark"
              onClick={() => onPageChange('example')}
            />
          </Row>
        </Center>
      </Paper>
    </Fixed>
  );
};

export default ExampleNavigation; 

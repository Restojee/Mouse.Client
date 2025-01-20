import { Flex } from '@common/.';
import React, { PropsWithChildren } from "react";
import { useAppPalette } from '@common/hooks/useAppPalette';
import { PaperProps } from '@ui/Layout/ui/Paper/types';
import { bg } from '@ui/Layout/ui/Paper/utils';
import cn from "clsx";
import styles from "./Paper.module.scss"
import useAppTheme from "@common/hooks/useAppTheme";

const Paper: React.FC<PropsWithChildren<PaperProps>> = (props) => {

  const { bgImage, bgColor, color, radius, className } = props;
  const flexClasses = cn(styles.root, className);
  const palette = useAppPalette();
  const theme = useAppTheme();

  const flexStyles: Pick<React.CSSProperties,
    | 'backgroundImage'
    | 'backgroundColor'
    | 'color'
    | 'borderRadius'
  > =
    React.useMemo(() => ({
      backgroundImage: bgImage && bg(bgImage),
      backgroundColor: palette.getColor(bgColor),
      color: palette.getColor(color),
      borderRadius: theme.getBorderRadius(radius),
    }),
    [bgImage, bgColor, color, radius]
  );

  return (
    <Flex
      className={flexClasses}
      styles={flexStyles}
      {...props}
    >
      { props.children }
    </Flex>
  );
};

export default React.memo(Paper);

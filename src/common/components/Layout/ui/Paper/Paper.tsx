import { Flex } from '@common/.';
import React, { PropsWithChildren } from "react";
import { useAppPalette } from '@common/hooks/useAppPalette';
import { PaperProps } from '@ui/Layout/ui/Paper/types';
import { bg } from '@ui/Layout/ui/Paper/utils';
import cn from "clsx";
import styles from "./Paper.module.scss"

const Paper: React.FC<PropsWithChildren<PaperProps>> = (props) => {

  const { bgImage, bgColor, color, radius } = props;
  const palette = useAppPalette();

  const flexStyles: Pick<React.CSSProperties, 'backgroundImage' | 'backgroundColor' | 'color'> =
    React.useMemo(() => ({
      backgroundImage: props.bgImage && bg(bgImage),
      backgroundColor: palette.getColor(bgColor),
      color: palette.getColor(color),
      borderRadius: radius,
    }),
    [bgImage, bgColor, color, radius]
  );

  return (
    <Flex
      className={cn(styles.root, props.className)}
      styles={flexStyles}
      {...props}
    >
      { props.children }
    </Flex>
  );
};

export default React.memo(Paper);

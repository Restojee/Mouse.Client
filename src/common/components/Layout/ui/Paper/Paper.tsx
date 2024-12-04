import { Flex } from '@common/.';
import React, { PropsWithChildren } from "react";
import { useAppPalette } from '@common/hooks/useAppPalette';
import { PaperProps } from '@ui/Layout/ui/Paper/types';
import { bg } from '@ui/Layout/ui/Paper/utils';
import cn from "clsx";
import styles from "./Paper.module.scss"

const Paper: React.FC<PropsWithChildren<PaperProps>> = (props) => {

  const palette = useAppPalette();

  const flexStyles: Pick<React.CSSProperties, 'backgroundImage' | 'backgroundColor' | 'color'> =
    React.useMemo(() => ({
      backgroundImage: props.bgImage && bg(props.bgImage),
      backgroundColor: palette.getColor(props.bgColor),
      color: palette.getColor(props.color),
      borderRadius: props.radius,
    }),
    [props.bgImage, props.bgColor, props.color]
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

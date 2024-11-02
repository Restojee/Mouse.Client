import { Flex } from '@common/.';
import React from 'react';
import { useAppPalette } from '@common/hooks/useAppPalette';
import { PaperProps } from '@ui/Layout/ui/Paper/types';
import { bg } from '@ui/Layout/ui/Paper/utils';

const Paper = (props: PaperProps) => {

  const palette = useAppPalette();

  const flexStyles: Pick<React.CSSProperties, 'backgroundImage' | 'backgroundColor' | 'color'> =
    React.useMemo(() => ({
      backgroundImage: props.bgImage && bg(props.bgImage),
      backgroundColor: palette.getColor(props.bgColor),
      color: palette.getColor(props.color),
    }),
    [props.bgImage, props.bgColor, props.color]
  );

  return <Flex {...props} styles={flexStyles} />;
};

export default React.memo(Paper);

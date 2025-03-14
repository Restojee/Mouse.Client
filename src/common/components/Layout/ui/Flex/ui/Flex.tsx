import * as React from 'react';
import { FlexProps } from '@ui/Layout/ui/Flex/common/types';
import { PropsWithChildren } from "react";
import useAppTheme from "@common/hooks/useAppTheme";
import cn from "clsx";
import { flexClasses } from "@ui/Layout/ui/Flex/common/constants";

import './Flex.scss';

const Flex: React.FC<PropsWithChildren<FlexProps>> = (props) => {
  const { gap, width, className, justify, align, height, pa, direction } = props;
  const Element = props.element;

  const theme = useAppTheme();

  const flexClassNames: string = cn(
    justify && flexClasses.justify[justify],
    align && flexClasses.align[align],
    direction && flexClasses.direction[direction],
    className,
    flexClasses.root,
  );

  const styles = {
    padding: theme.getPadding({
      pa: props.pa,
      px: props.px,
      py: props.py,
      pl: props.pl,
      pr: props.pr,
      pt: props.pt,
      pb: props.pb
    }),
    width: width && theme.getCalculatedSize(props.width),
    height: height && theme.getCalculatedSize(props.height),
    gap: gap && theme.getCalculatedSize(props.gap),
  };

  return (
    <Element className={flexClassNames} style={styles}>
      {props.children}
    </Element>
  );
};

Flex.defaultProps = {
  justify: 'center',
  align: 'start',
  direction: 'row',
  element: 'div',
}

export default React.memo(Flex);

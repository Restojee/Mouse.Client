import * as React from 'react';
import { FlexProps } from '@ui/Layout/ui/Flex/common/types';
import { PropsWithChildren } from "react";
import useAppTheme from "@common/hooks/useAppTheme";
import { flexClasses } from "@ui/Layout/ui/Flex/common/constants";

import './Flex.scss';
import withAutoClasses, { WithAutoClassProps } from "@common/hooks/useAutoClasses";

const Flex: React.FC<PropsWithChildren<WithAutoClassProps<FlexProps>>> = (props) => {
  const {
    element = 'div',

    pa,
    px,
    py,
    pl,
    pr,
    pt,
    pb,

    width,
    minWidth,
    maxWidth,
    height,
    autoClasses,
    children,
  } = props;

  const Element = element;

  const theme = useAppTheme();

  const styles = {
    padding: theme.getPadding({ pa, px, py, pl, pr, pt, pb }),
    width: width && theme.getCalculatedSize(width),
    minWidth: minWidth && theme.getCalculatedSize(minWidth),
    maxWidth: maxWidth && theme.getCalculatedSize(maxWidth),
    height: height && theme.getCalculatedSize(height),
  };

  return (
    <Element className={autoClasses} style={styles}>
      {children}
    </Element>
  );
};

export default withAutoClasses(Flex, {
  bindings: [
    ['gap', flexClasses.gap],
    ['align', flexClasses.align],
    ['direction', flexClasses.direction],
    ['justify', flexClasses.justify],
  ],
  defaults: {
    justify: 'center',
    align: 'start',
    direction: 'row',
  },
  root: flexClasses.root
});

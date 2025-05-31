import * as React from 'react';
import { FlexProps } from '@ui/Layout/ui/Flex/common/types';
import { PropsWithChildren } from "react";
import useAppTheme from "@common/hooks/useAppTheme";
import { flexClasses } from "@ui/Layout/ui/Flex/common/constants";
import cn from "clsx";

import './Flex.scss';
import withAutoClasses, { WithAutoClassProps } from "@common/hooks/useAutoClasses";
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import LinkViewModel from "@ui/Link/ui/Link.model";
import { LinkProps } from "@ui/Link/ui/types";
import FlexViewModel from "@ui/Layout/ui/Flex/ui/FlexViewModel";

type FlexViewComponent = React.FC<WithAutoClassProps<WithViewProps<FlexViewModel, FlexProps>>>;
const Flex: FlexViewComponent = (props) => {
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
    nonIntegration,

    viewModel
  } = props;

  const Element = element;

  const styles = {
    padding: viewModel.theme.getPadding({ pa, px, py, pl, pr, pt, pb }),
    width: width && viewModel.theme.getCalculatedSize(width),
    minWidth: minWidth && viewModel.theme.getCalculatedSize(minWidth),
    maxWidth: maxWidth && viewModel.theme.getCalculatedSize(maxWidth),
    height: height && viewModel.theme.getCalculatedSize(height),
  };

  const flexClassNames = cn(autoClasses, nonIntegration && 'nonIntegration');

  return (
    <Element className={flexClassNames} style={styles}>
      {children}
    </Element>
  );
};

export default withAutoClasses(
  withView(Flex, FlexViewModel), {
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
  }
)

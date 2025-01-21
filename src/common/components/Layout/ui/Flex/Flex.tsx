import * as React from 'react';
import { FlexProps } from '@ui/Layout/ui/Flex/types';
import { PropsWithChildren } from "react";
import './Flex.module.scss';
import useAppTheme from "@common/hooks/useAppTheme";
import cn from "clsx";
import classes from "./Flex.module.scss";
import { calcSize } from "@common/themes/common/utils";

const Flex: React.FC<PropsWithChildren<FlexProps>> = (props) => {

  const Element = props.element;

  const theme = useAppTheme();

  /* Root classes */
  const flexClassNames: string = cn(
    classes.root,
    props.justify && classes[props.justify],
    props.align && classes[props.align],
    props.direction && classes[props.direction],
    props.className
  );
  console.log(props.pa)
  /* Root styles */
  const styles: Pick<React.CSSProperties, "width" | "height" | "gap"> =
    React.useMemo(
      () => ({
        padding: props.pa && theme.getPadding({ pa: props.pa }),
        width: props.width && theme.getCalculatedSize(props.width),
        height: props.height && theme.getCalculatedSize(props.height),
        gap: props.gap && theme.getCalculatedSize(props.gap),
        ...props.styles,
      }),
      [props.gap, props.styles, props.width, props.height, props.pa]
    );

  /* Html element by props.element */
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

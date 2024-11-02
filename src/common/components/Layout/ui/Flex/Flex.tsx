import * as React from 'react';
import cn from 'clsx';
import './Flex.scss';
import { FlexProps } from '@ui/Layout/ui/Flex/types';
import { flexStyles as cls } from '@ui/Layout/ui/Flex/constants';
import { calc } from '@ui/Layout/ui/Flex/utils';

const Flex: React.FC<FlexProps> = (props) => {

  /* Default values */
  const {
    justify = 'center',
    align = 'start',
    direction = 'row',
    element: Element = 'div'
  } = props;

  /* Root classes */
  const flexClasses = cn([
    cls.core,
    justify && cls.justify[justify],
    align && cls.align[align],
    direction && cls.direction[direction],
    props.className,
  ]);

  /* Root styles */
  const flexStyles: Pick<React.CSSProperties, "width" | "height" | "gap"> =
    React.useMemo(
      () => ({
        width: calc(props.width),
        height: calc(props.height),
        gap: props.gap
      }),
      [props.width, props.height, props.width]
  );

  /* Html element by props.element */
  return <Element className={flexClasses} style={flexStyles} {...props} />;
};

export default React.memo(Flex);

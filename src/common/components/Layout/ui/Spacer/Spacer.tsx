import { Flex, type FlexProps } from '@ui/Layout';
import cn from 'clsx';
import styles from './Spacer.module.scss';
import React from 'react';

const SpacerStyles = {
  vertical: styles.Spacer_vertical,
  horizontal: styles.Spacer_horizontal,
};

interface SpaceProps extends FlexProps {}
export const Spacer: React.FC<SpaceProps> = (props) => {
  const {
    justify = 'center',
    align = 'start',
    direction = 'column',
    wrap = 'wrap',
    className,
    children,
    ...otherProps
  } = props;

  return (
    <Flex
      justify={justify}
      align={align}
      direction={direction}
      className={cn([SpacerStyles[direction], className])}
      wrap={wrap}
      {...otherProps}
    >
      {children}
    </Flex>
  );
};

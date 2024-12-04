import { Flex, type FlexProps } from '@ui/Layout';
import cn from 'clsx';
import React from 'react';
import styles from './Spacer.module.scss';

const SpacerStyles = {
  column: styles.column,
  row: styles.row,
};

interface SpaceProps extends FlexProps {}
export const Spacer: React.FC<SpaceProps> = (props) => {
  const { className, children } = props;

  return (
    <Flex className={cn([SpacerStyles[props.direction], className])} {...props}>
      {children}
    </Flex>
  );
};

Spacer.defaultProps = {
  justify: 'center',
  align: 'start',
  direction: 'column',
  wrap: 'wrap',
}

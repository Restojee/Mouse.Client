import * as React from 'react';
import { Column, Paper } from '@common/.';
import clsx from 'clsx';
import styles from './Scroll.module.scss';
import { ColumnProps } from '@ui/Layout/ui/Column/Column';

interface ScrollProps extends ColumnProps {
  children?: React.ReactNode;
  className?: string;
}
export const Scroll = (props: ScrollProps) => {
  const { children, className } = props;

  return (
    <Column className={styles.Content} gap={4}>
      <Paper className={clsx([styles.Scroll, className])}>
        {children}
      </Paper>
    </Column>
  );
};

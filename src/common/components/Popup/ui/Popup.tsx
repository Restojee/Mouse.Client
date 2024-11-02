import React, { type ReactElement } from 'react';
import { Column, Paper, Row } from '@common/.';
import styles from './Popup.module.scss';

interface PopupProps {
  header?: ReactElement;
  children?: ReactElement;
  footer?: ReactElement;
  width?: number;
  left?: number;
  bottom?: number;
  isVisible?: boolean;
  className?: string;
}
export const Popup = (props: PopupProps) => {
  const { header, children, width, left, bottom, footer, className } = props;

  return (
    <Paper className={`${styles.Popup} ${className}`}>
      <Row className={styles.Header}>{header}</Row>

      <Column className={styles.Body} gap={15}>
        {children}
      </Column>

      <Paper>{footer}</Paper>
    </Paper>
  );
};

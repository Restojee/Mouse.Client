import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Modal.module.scss';
import { Center, Paper } from "@ui/Layout";

interface ModalProps {
  children?: ReactNode;
  className?: string;
}
export const Modal = (props: ModalProps) => {
  const { children, className } = props;

  return (
    <Center className={styles.Modal}>
      <Paper className={clsx([styles.Container, className])}>{children}</Paper>
      <Paper className={styles.Shadow} />
    </Center>
  );
};

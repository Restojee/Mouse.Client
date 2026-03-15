import * as React from 'react';
import { type FormFieldItemProps } from '@ui/FormGroup';
import { Column } from '@ui/Layout';
import { Typography } from "@ui/Typography";
import styles from './FormFieldItem.module.scss';

export const FormFieldItem: React.FC<FormFieldItemProps> = ({ children, error, className = '' }) => (
  <Column className={className}>
    <div className={`${styles.Control} ${error ? styles.ControlError : ''}`}>{children}</div>
    {error && (
      <Typography className={styles.ErrorText} size="sm" color="paletteTextError">
        {error}
      </Typography>
    )}
  </Column>
);

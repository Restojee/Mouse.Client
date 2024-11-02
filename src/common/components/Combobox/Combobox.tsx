import styles from '@ui/Select/ui/SelectCore/SelectCore.module.scss';
import { Paper } from '@ui/Layout';
import React from 'react';
import { type ComboboxProps } from '@ui/Combobox/types';

const Combobox: React.FC<ComboboxProps> = (props) => (
  <Paper className={styles.DropDownList}>{props.label}</Paper>
);

export default Combobox;

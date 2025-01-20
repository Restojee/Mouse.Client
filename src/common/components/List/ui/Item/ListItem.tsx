import * as React from 'react';
import { Paper } from '@ui/Layout';
import classNames from 'clsx';
import { ListItemIconPositions, type ListItemProps } from '@ui/Select/common/types';
import { useListItemIcons } from '@ui/List/hooks/useListItemIcons';
import styles from './ListItem.module.scss';
import { Typography } from "@/common";

export const ListItem: React.FC<ListItemProps> = (props) => {
  const { onClick, label, blocked, rightIcons, leftIcons, leftIcon, rightIcon, disabled } = props;

  const renderIcons = useListItemIcons({ disabled });

  const dropDownClasses = classNames([styles.ListItem, blocked && styles.blocked]);

  return (
    <Paper className={dropDownClasses} onClick={onClick}>
      {renderIcons(leftIcon, leftIcons, ListItemIconPositions.Left)}
      <Typography>{label}</Typography>
      {renderIcons(rightIcon, rightIcons, ListItemIconPositions.Right)}
    </Paper>
  );
};

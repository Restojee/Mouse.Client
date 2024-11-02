import * as React from 'react';
import { Paper } from '@ui/Layout';
import classNames from 'clsx';
import { ListItemIconPositions, type ListItemProps } from '@ui/Select/common/types';
import { useListItemIcons } from '@ui/List/hooks/useListItemIcons';
import { Text } from '@ui/Typography';
import styles from './ListItem.module.scss';

export const ListItem: React.FC<ListItemProps> = (props) => {
  const { onClick, label, blocked, rightIcons, leftIcons, leftIcon, rightIcon, disabled } = props;

  const renderIcons = useListItemIcons({ disabled });

  const dropDownClasses = classNames([styles.ListItem, blocked && styles.blocked]);

  return (
    <Paper className={dropDownClasses} onClick={onClick}>
      {renderIcons(leftIcon, leftIcons, ListItemIconPositions.Left)}
      <Text>{label}</Text>
      {renderIcons(rightIcon, rightIcons, ListItemIconPositions.Right)}
    </Paper>
  );
};

import classNames from 'clsx';
import { Button, ButtonProps } from '@common/.';
import React from 'react';
import { type IconButtonProps } from '@ui/Button/common/types';
import styles from './IconButton.module.scss';

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { className } = props;
  const iconButtonClasses = classNames(className, styles.IconButton);
  return <Button className={iconButtonClasses} {...props} />;
};

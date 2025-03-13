import * as React from 'react';
import classNames from 'clsx';
import styles from './CoreButton.module.scss';
import { ButtonProps } from "@ui/Button";
import { Typography } from "@ui/Typography";

const Component = 'button';

export const CoreButton: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    append,
    prepend,
    label,
    type = 'button',
    color = 'primary',
    ...otherProps
  } = props;

  return (
    <Component
      className={
        classNames(
          styles.CoreButton,
          color
        )
      }
      {...otherProps}
    >
      {prepend}
      {children || <Typography ellipsis>{label}</Typography>}
      {append}
    </Component>
  );
};

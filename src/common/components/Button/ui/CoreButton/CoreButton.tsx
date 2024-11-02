import * as React from 'react';
import { type ButtonProps, Text } from '@common/.';
import classNames from 'clsx';
import styles from './CoreButton.module.scss';
import { useAppPalette } from '@common/hooks/useAppPalette';

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

  const palette = useAppPalette();

  return (
    <Component
      className={
        classNames(
          styles.CoreButton,
          palette.getColor(color)
        )
      }
      {...otherProps}
    >
      {prepend}
      {children || <Text ellipsis>{label}</Text>}
      {append}
    </Component>
  );
};

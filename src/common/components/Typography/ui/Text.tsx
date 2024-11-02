import clsx from 'clsx';
import * as React from 'react';
import styles from './Typography.module.scss';
import { TextColorKey } from '@common/themes/common/types';
import { useAppPalette } from '@common/hooks/useAppPalette';
import { Tag } from '@common/constants/tag';

export interface TypographyProps {
  fontSize?: number | string;
  ellipsis?: boolean;
  upperCase?: boolean;
  link?: boolean;
  clickable?: boolean;
  cantSelect?: boolean;
  children?: React.ReactNode;
  className?: string;
  size?: string;
  opacity?: number;
  tag?:
    | Tag.H1
    | Tag.H2
    | Tag.H3
    | Tag.H4
    | Tag.H5
    | Tag.H6
    | Tag.P
    | Tag.Span;
  color?: TextColorKey;
}
export const Text: React.FC<TypographyProps> = (props) => {
  const {
    color = '',
    fontSize,
    ellipsis,
    upperCase,
    clickable,
    link,
    cantSelect,
    children,
    className,
    tag,
    opacity,
    size,
  } = props;

  const Component = tag || Tag.Span;

  const palette = useAppPalette();

  const textStyles = React.useMemo(() => (
    clsx([
       ellipsis && styles.ellipsis,
       cantSelect && styles.unselectable,
       clickable && styles.clickable,
       upperCase && styles.upperCase,
       link && styles.link,
       className,
    ])
  ), [ellipsis, cantSelect, clickable, link, className])

  const wrapperStyles = React.useMemo(() => ({
    // Шрифт в классы
    fontSize,
  }), [fontSize, color])

  return (
    <Component
      style={wrapperStyles}
      className={`${textStyles} ${palette.getColor(color)}`}
    >
      {children}
    </Component>
  );
};

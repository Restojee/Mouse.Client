import clsx from 'clsx';
import * as React from 'react';
import styles from './Typography.module.scss';
import { useAppPalette } from '@common/hooks/useAppPalette';
import { TextTags } from '@common/constants/textTags';
import { TypographyProps } from "@ui/Typography/common/types";

const Typography: React.FC<TypographyProps> = (props) => {
  const {
    color,
    fontSize,
    ellipsis,
    upperCase,
    clickable,
    link,
    cantSelect,
    children,
    className,
    tag,
  } = props;

  const Component = tag || TextTags.Span;

  const palette = useAppPalette();

  const textStyles = React.useMemo(() => (
    clsx(
      ellipsis && styles.ellipsis,
      cantSelect && styles.unselectable,
      clickable && styles.clickable,
      upperCase && styles.upperCase,
      link && styles.link,
      className,
    )
  ), [ellipsis, cantSelect, clickable, link, className])

  const wrapperStyles = React.useMemo(() => ({
    // Шрифт в классы
    fontSize,
  }), [fontSize])

  return (
    <Component
      style={wrapperStyles}
      className={`${textStyles} ${palette.getColor(color)}`}
    >
      {children}
    </Component>
  );
};

export default Typography;
import * as React from 'react';
import classNames from 'clsx';
import styles from './CoreButton.module.scss';
import { ButtonProps } from "@ui/Button";
import { Typography } from "@ui/Typography";
import { calcSize } from "@common/themes/common/utils";
import withAutoClasses, { WithAutoClassProps } from "@common/hooks/useAutoClasses";
import clsx from 'clsx';

const Component = 'button';

const CoreButtonComponent: React.FC<WithAutoClassProps<ButtonProps>> = (props) => {
  const {
    children,
    className,
    append,
    prepend,
    label,
    type = 'button',
    color = 'paletteTextOnColor',
    bgColor = 'paletteBackgroundStatusInfoDark',
    border,
    borderColor,
    borderRadius,
    padding,
    fontSize,
    fontWeight,
    minWidth,
    maxWidth,
    width,
    height,
    hoverBorderColor,
    hoverBgColor,
    hoverColor,
    activeBorderColor,
    activeBgColor,
    activeColor,
    isActive,
    autoClasses,
    ...otherProps
  } = props;

  // Базовые размеры и позиционирование через инлайн-стили
  const inlineStyles = {
    padding,
    fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
    minWidth: calcSize(minWidth),
    maxWidth: calcSize(maxWidth),
    width: calcSize(width),
    height: calcSize(height),
  };

  // Генерируем CSS-классы из токенов
  const tokenClasses = clsx([
    color,
    borderColor,
    // Добавляем классы для активного состояния
    isActive && activeBorderColor,
    isActive ? activeBgColor : bgColor,
    isActive && activeColor,
    // Классы для hover-эффектов
    !isActive && hoverBorderColor,
    !isActive && hoverBgColor,
    !isActive && hoverColor,
  ]);

  return (
    <Component
      className={classNames(
        styles.CoreButton,
        autoClasses,
        tokenClasses,
        className,
      )}
      style={inlineStyles}
      {...otherProps}
    >
      {prepend}
      {children || <Typography color={isActive && activeColor ? activeColor : color} ellipsis>{label}</Typography>}
      {append}
    </Component>
  );
};

// Определяем маппинги для стилей
const fontWeightMapping = {
  'light': 'fontWeightLight',
  'normal': 'fontWeightNormal',
  'medium': 'fontWeightMedium',
  'semiBold': 'fontWeightSemiBold',
  'bold': 'fontWeightBold',
};

// Определяем маппинги для бордеров
const borderMapping = {
  'thin': 'borderThinNormal',
  'normal': 'borderNormalNormal',
  'thick': 'borderThickNormal',
};

// Определяем маппинги для радиусов
const borderRadiusMapping = {
  'sm': 'borderRadiusSm',
  'md': 'borderRadiusMd',
  'lg': 'borderRadiusLg',
};

// Применяем withAutoClasses
export const CoreButton = withAutoClasses(CoreButtonComponent, {
  bindings: [
    // Если isActive true, добавляем класс active
    'isActive',
    // Маппинги для различных свойств
    ['fontWeight', fontWeightMapping],
    ['border', borderMapping],
    ['borderRadius', borderRadiusMapping],
  ],
  root: styles.CoreButton,
});

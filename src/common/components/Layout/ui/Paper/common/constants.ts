import { ThemeSizes } from "@common/themes/common/types";

export const paperPrx = 'UiPaper';

// Базовые классы для радиусов размеров
const paperFlexRadius: Partial<Record<ThemeSizes, string>> = {
  sm: 'borderRadiusSm',
  md: 'borderRadiusMd',
  lg: 'borderRadiusLg',
}

// Добавляем специальный класс для отсутствия радиуса
const specialRadiusClasses = {
  none: 'borderRadiusNone'
};

export const paperFlexClasses = {
  root: paperPrx,
  ...paperFlexRadius,
  ...specialRadiusClasses
}

// Карта соответствия значений radius классам CSS
export const paperRadiusClassBySizeMap: Partial<Record<ThemeSizes | 'none', string>> = {
  lg: paperFlexClasses.lg,
  md: paperFlexClasses.md,
  sm: paperFlexClasses.sm,
  none: paperFlexClasses.none
}

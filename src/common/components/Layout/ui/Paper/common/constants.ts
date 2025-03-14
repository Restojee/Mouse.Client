import { ThemeSizes } from "@common/themes/common/types";

export const paperPrx = 'UiPaper';

const paperFlexRadius: Partial<Record<ThemeSizes, string>> = {
  sm: 'borderRadiusSm',
  md: 'borderRadiusMd',
  lg: 'borderRadiusLg',
}

export const paperFlexClasses = {
  root: paperPrx,
  ...paperFlexRadius,
}

export const paperRadiusClassBySizeMap: Partial<Record<ThemeSizes, string>> = {
  lg: paperFlexClasses.lg,
  md: paperFlexClasses.md,
  sm: paperFlexClasses.sm,
}

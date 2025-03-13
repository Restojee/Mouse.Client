import { ThemeSizes } from "@common/themes/common/types";

export const paperPrx = 'UiPaper';

const paperFlexRadius: Record<ThemeSizes, string> = {
  sm: 'borderRadiusSm',
  md: 'borderRadiusMd',
  lg: 'borderRadiusLg',
}

export const paperFlexClasses = {
  root: paperPrx,
  ...paperFlexRadius,
}

export const paperRadiusClassBySizeMap: Record<ThemeSizes, string> = {
  lg: paperFlexClasses.lg,
  md: paperFlexClasses.md,
  sm: paperFlexClasses.sm,
}

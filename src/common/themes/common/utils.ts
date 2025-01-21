// TODO Вынести в Тему

import { ThemePaddingSizesMap } from "@ui/Layout/ui/Flex/types";
import { ThemeSizes } from "@common/themes/common/types";

export const getPaddingStyles = (
  themeLayoutSpaceMap: Record<ThemeSizes, string>,
  propMap: ThemePaddingSizesMap
): string => {
  let top: string;
  let bottom: string;
  let left: string;
  let right: string;

  for (let key in propMap) {
    const sizeByThemeKey: ThemeSizes = propMap[key];
    const sizePxFromTheme: string = themeLayoutSpaceMap[sizeByThemeKey];
    switch (key) {
      case 'pa': {
        top = left = right = bottom = sizePxFromTheme;
        break;
      }
      case 'px': {
        left = right = sizePxFromTheme;
        break;
      }
      case 'py': {
        top = bottom = sizePxFromTheme;
        break;
      }
      case 'pr': {
        right = sizePxFromTheme;
        break;
      }
      case 'pl': {
        left = sizePxFromTheme;
        break;
      }
      case 'pb': {
        bottom = sizePxFromTheme;
        break;
      }
      case 'top': {
        top = sizePxFromTheme;
        break;
      }
    }
  }
  return `${top} ${right} ${bottom} ${left}`;
}

export const getPercent = (number: number): string => `${number * 100}%`;
export const getPx = (number: number): string => `${number}px`;
export const calcSize = (size: number): string => size <= 1 ? getPercent(size) : getPx(size);
export const getBorderRadius = (themeBorderRadiusMap: Record<ThemeSizes, string>, size: ThemeSizes) => themeBorderRadiusMap[size];
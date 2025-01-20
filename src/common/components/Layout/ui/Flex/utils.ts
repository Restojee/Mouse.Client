// TODO Вынести в Тему

import { Theme } from "@common/themes/core/Theme";
import { ThemePaddingSizesMap } from "@ui/Layout/ui/Flex/types";
import { ThemeSizes } from "@common/themes/common/types";

const getPaddingStyles = (theme: Theme, propMap: ThemePaddingSizesMap): string => {
  let top: number = 0;
  let bottom: number = 0;
  let left: number = 0;
  let right: number = 0;

  for (let key in propMap) {
    const size = propMap[key];
    const sizeFromTheme = Number(theme.get().layout.space[size]);
    switch (key) {
      case 'pa': {
        top = left = right = bottom = sizeFromTheme;
        break;
      }
      case 'px': {
        left = right = sizeFromTheme;
        break;
      }
      case 'py': {
        top = bottom = sizeFromTheme;
        break;
      }
      case 'pr': {
        right = sizeFromTheme;
        break;
      }
      case 'pl': {
        left = sizeFromTheme;
        break;
      }
      case 'pb': {
        bottom = sizeFromTheme;
        break;
      }
      case 'top': {
        top = sizeFromTheme;
        break;
      }
    }
  }

  return `${top}px ${right}px ${bottom}px ${left}px`;
}

export const getPercent = (number: number): string => `${number * 100}%`;
export const getPx = (number: number): string => `${number}px`;
export const calcSize = (size: number): string => size <= 1 ? getPercent(size) : getPx(size);
export const getPadding = (theme: Theme, propMap: ThemePaddingSizesMap) => getPaddingStyles(theme, propMap);
export const getBorderRadius = (theme: Theme, size: ThemeSizes) => theme.get().layout.border.radius[size];
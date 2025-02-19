import defaultTheme from '../resources/theme.json';
import { ThemePaddingSizesMap } from "@ui/Layout/ui/Flex/types";
import { ThemeSizes } from "@common/themes/common/types";
import { calcSize, getBorderRadius, getPaddingStyles } from "@common/themes/common/utils";
import { Register } from "@common/utils/di/Register";

export const ThemeInjectKey = 'Theme';

@Register(ThemeInjectKey)
export class Theme {

  get() {
    return defaultTheme;
  }
  getPadding(paddingSizesMap: ThemePaddingSizesMap) {
    return getPaddingStyles(this.getLayoutSpaceMap(), paddingSizesMap)
  }
  getBorderRadius(sizes: ThemeSizes) {
    return getBorderRadius(this.getBorderRadiusMap(), sizes)
  }
  getLayoutSpaceMap() {
    return this.get().layout.space;
  }
  getBorderRadiusMap() {
    return this.get().layout.border.radius
  }
  getCalculatedSize(size: number) {
    return calcSize(size);
  }
}

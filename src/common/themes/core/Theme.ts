import defaultTheme from '../resources/theme.json';
import { getBorderRadius, getPadding } from "@ui/Layout/ui/Flex/utils";
import { ThemePaddingSizesMap } from "@ui/Layout/ui/Flex/types";
import { ThemeSizes } from "@common/themes/common/types";

export class Theme {
  get() {
    return defaultTheme;
  }
  getPadding(paddingSizesMap: ThemePaddingSizesMap) {
    return getPadding(this, paddingSizesMap)
  }
  getBorderRadius(sizes: ThemeSizes) {
    return getBorderRadius(this, sizes)
  }
}

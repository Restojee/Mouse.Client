import {
  BorderColorKey,
  CardColorKey,
  ColorKey,
  LineColorKey,
  PanelColorKey,
  TextColorKey,
  ThemeColorKey,
  ThemeColors,
} from '@common/themes/common/types';
import { Theme } from '@common/themes/core/Theme';

class Palette {
  private _theme: Theme;

  public from(theme: Theme) {
    this._theme = theme;
    return this;
  }

  getColor = (colorKey: ThemeColorKey | string) =>
    this._theme.get().palette.colors[colorKey]
}

export default Palette;
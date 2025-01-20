import { ThemeColorKey } from '@common/themes/common/types';
import { Theme } from '@common/themes/core/Theme';

class Palette {
  private _theme: Theme;

  constructor() {
    return this;
  }

  public from(theme: Theme) {
    this._theme = theme;
    return this;
  }

  getColor = (colorKey?: ThemeColorKey) =>
    this._theme.get().palette.colors[colorKey]
}

export default Palette;
import { ThemeColorKey } from '@common/themes/common/types';
import { Theme, ThemeInjectKey } from "@common/themes/core/Theme";
import { Register } from "@common/utils/di/Register";
import { Inject } from "@common/utils/di/Inject";

export const PaletteInjectKey = Symbol.for('Palette');

@Register(PaletteInjectKey)
class Palette {

  constructor(@Inject(ThemeInjectKey) private theme: Theme) {
    return this;
  }

  public getColor = (colorKey?: ThemeColorKey) =>
    this.theme.get().palette.colors[colorKey]
}

export default Palette;
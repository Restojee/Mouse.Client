import { Theme } from '@common/themes/core/Theme';
import { AppInstance } from '@common/instances';
import Palette from '@common/themes/core/Pallete';

export const ThemeInjectKey = 'Theme';
export const PaletteInjectKey = 'Palette';
export const HttpInjectKey = 'Http';

export default class Services {
  constructor() {
    return this;
  }

  init() {
    AppInstance.add(ThemeInjectKey, new Theme());
    AppInstance.add(PaletteInjectKey, new Palette());
  }
}


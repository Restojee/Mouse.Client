import { AppInstance } from '@common/instances';
import { PaletteInjectKey, ThemeInjectKey } from "@common/services";
import Palette from '@common/themes/core/Pallete';

export const useAppPalette = () =>
  AppInstance
    .get<Palette>(PaletteInjectKey)
    .from(AppInstance.get(ThemeInjectKey));
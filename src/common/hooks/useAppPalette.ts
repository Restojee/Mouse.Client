import Palette, { PaletteInjectKey } from "@common/themes/core/Pallete";
import { container } from "@common/utils/di/DIContainer";

export const useAppPalette = () =>
  container.resolve<Palette>(PaletteInjectKey)
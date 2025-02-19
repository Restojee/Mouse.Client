import Palette, { PaletteInjectKey } from "@common/themes/core/Pallete";
import { Instance } from "@common/instances/Instance";

export const useAppPalette = () =>
  Instance.get<Palette>(PaletteInjectKey)
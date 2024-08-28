import { DefaultTheme } from "@/layout/theme/constants";

export type Themes = {
  [key in ThemeKey]: GlobalTheme;
};

export type GlobalTheme = typeof DefaultTheme;

export enum ThemeKey {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

import defaultTheme from '@common/themes/resources/theme.json';

export type Palette = typeof defaultTheme.palette;
export type ColorKey = keyof Palette["colors"];
export type WithColors<T = {}> = T & Palette["colors"];
export type CardColorKey = keyof WithColors<Palette["card"]>;
export type TextColorKey = keyof WithColors<Palette["text"]>;
export type PanelColorKey = keyof WithColors<Palette["panel"]>;
export type IconColorKey = keyof WithColors<Palette["icon"]>;
export type LineColorKey = keyof WithColors<Palette["line"]>;
export type BorderColorKey = keyof WithColors<Palette["border"]>;
export type ThemeColorKey =
  | BorderColorKey
  | LineColorKey
  | IconColorKey
  | PanelColorKey
  | TextColorKey
  | CardColorKey
  | ColorKey

export type ThemeColors =
  | Palette["card"]
  | Palette["text"]
  | Palette["panel"]
  | Palette["icon"]
  | Palette["line"]
  | Palette["border"]

export type ThemeSizes = "sm" | "md" | "lg"
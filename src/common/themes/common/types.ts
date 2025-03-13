import defaultTheme from '@/resources/theme.json';
import { ThemeTokens } from "@common/themes/common/variables";

export type Palette = typeof defaultTheme.palette;
export type ColorKey = keyof Palette["colors"];
export type WithColors<T = {}> = T & Palette["colors"];
export type TextColorKey = keyof WithColors<Palette["text"]>;
// export type IconColorKey = keyof WithColors<Palette["icon"]>;
// export type LineColorKey = keyof WithColors<Palette["line"]>;
// export type BorderColorKey = keyof WithColors<Palette["border"]>;
export type ThemeColorKey = ThemeTokens;

export type ThemeColors =
  | Palette["text"]
  | Palette["icon"]
  | Palette["line"]
  | Palette["border"]

export type ThemeSizes = "sm" | "md" | "lg"

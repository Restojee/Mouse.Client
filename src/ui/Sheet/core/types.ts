import { Property } from "csstype";
import { ThemeKey } from "@/layout/theme/types";

/** Визуальная конфигурация Sheet — передаётся при createSheet или в show() */
export type SheetConfig = {
  title?: string;
  width?: Property.Width<number>;
  withoutTitle?: boolean;
  withoutButtons?: boolean;
  autoHeight?: boolean;
  text?: string;
  accessDisabled?: boolean;
  height?: number | string;
  noHeader?: boolean;
  padding?: number;
  themeKey?: ThemeKey;
  zIndex?: number;
  onlyMobile?: boolean;
};

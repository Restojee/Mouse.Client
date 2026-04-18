import { ComponentType } from "react";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SheetComponent = ComponentType<any>;

export type SheetViewInstance = {
  id: string;
  component: SheetComponent;
  props: object;
  config: SheetConfig;
};

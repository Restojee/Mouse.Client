import { Property } from "csstype";
import { ThemeKey } from "@/layout/theme/types";

/** Сериализуемая конфигурация Sheet (хранится в Redux) */
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
  zIndex?: number;
  padding?: number;
  themeKey?: ThemeKey;
};

/** Опции для sheet.show() — включает callbacks и контент */
export type ShowSheetOptions = SheetConfig & {
  onClose?: () => void;
  onAccess?: () => void;
};

/** Хэндл открытого sheet'а */
export type SheetHandle = {
  close: () => void;
};

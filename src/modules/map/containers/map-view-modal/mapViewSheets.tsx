import { ThemeKey } from "@/layout/theme/types";
import { MapContent } from "@/modules/map/containers/map-content/MapContent";
import { createSheet } from "@/ui/Sheet/core/createSheet";
import { SheetKind } from "@/ui/Sheet/core/sheetKind";
import { SheetConfig } from "@/ui/Sheet/core/types";

export const MAP_CONTENT_SHEET_CONFIG: SheetConfig = {
  noHeader: true,
  padding: 0,
  width: "1200px",
  withoutButtons: true,
  withoutTitle: true,
  themeKey: ThemeKey.DARK,
};

/** Sheet для просмотра карты (MapContent). */
export const mapContentSheet = createSheet(MapContent, SheetKind.MapContent, MAP_CONTENT_SHEET_CONFIG);

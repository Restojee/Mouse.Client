import { createSheet } from "@/ui/Sheet/core/createSheet";
import { SheetKind } from "@/ui/Sheet/core/sheetKind";
import { SidebarContent } from "./containers/sidebar/SidebarContent";

export const mapSidebarSheet = createSheet(SidebarContent, SheetKind.MapSidebar, {
  noHeader: true,
  withoutButtons: true,
  withoutTitle: true,
  height: 600,
  onlyMobile: true,
});

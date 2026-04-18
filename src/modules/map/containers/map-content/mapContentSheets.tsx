import { createSheet } from "@/ui/Sheet/core/createSheet";
import { SidebarContent } from "./containers/sidebar/SidebarContent";

export const mapSidebarSheet = createSheet(SidebarContent, {
  noHeader: true,
  withoutButtons: true,
  withoutTitle: true,
  height: 600,
  onlyMobile: true,
});

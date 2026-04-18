import React, { Suspense } from "react";
import { createSheet } from "@/ui/Sheet/core/createSheet";
import { SheetKind } from "@/ui/Sheet/core/sheetKind";
import { TabsType } from "@/layout/panel/Panel";
import { ThemeKey } from "@/layout/theme/types";
import { MobileNavDrawerContent } from "@/layout/mobile/MobileNavDrawer";

const LazyDrawer = React.lazy(() => import("@/layout/drawer/Drawer").then((m) => ({ default: m.Drawer })));

type DrawerSheetProps = { activeTab: TabsType };

const DrawerContent = ({ activeTab }: DrawerSheetProps) => (
  <Suspense fallback={null}>
    <LazyDrawer
      isOpen
      activeTab={activeTab}
    />
  </Suspense>
);

export const drawerSheet = createSheet<DrawerSheetProps>(DrawerContent, SheetKind.Drawer, {
  noHeader: true,
  height: "85dvh",
  withoutButtons: true,
  withoutTitle: true,
});

export const navDrawerSheet = createSheet(MobileNavDrawerContent, SheetKind.NavDrawer, {
  noHeader: true,
  height: "85dvh",
  withoutButtons: true,
  withoutTitle: true,
  themeKey: ThemeKey.DARK,
});

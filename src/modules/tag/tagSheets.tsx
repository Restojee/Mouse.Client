import React, { Suspense } from "react";
import { createSheet } from "@/ui/Sheet/core/createSheet";
import { SheetKind } from "@/ui/Sheet/core/sheetKind";

const LazyTagsModal = React.lazy(() => import("@/modules/tag/components/TagsModal"));

const TagsModalContent = () => (
  <Suspense fallback={null}>
    <LazyTagsModal />
  </Suspense>
);

export const tagsUpdateSheet = createSheet<object, boolean>(TagsModalContent, SheetKind.TagsUpdate, {
  title: "Изменение тегов карты",
  width: 700,
});

export { confirmSheet } from "@/ui/Sheet/sheets/confirmSheet";

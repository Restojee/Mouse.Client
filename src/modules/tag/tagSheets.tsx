import React, { Suspense } from "react";
import { createSheet } from "@/ui/Sheet/core/createSheet";

const LazyTagsModal = React.lazy(() => import("@/modules/tag/components/TagsModal"));

const TagsModalContent = () => (
  <Suspense fallback={null}>
    <LazyTagsModal />
  </Suspense>
);

export const tagsUpdateSheet = createSheet<object, boolean>(TagsModalContent, {
  title: "Изменение тегов карты",
  width: 700,
});

export { confirmSheet } from "@/ui/Sheet/sheets/confirmSheet";

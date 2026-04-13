import React, { Suspense } from "react";
import { createSheet } from "@/ui/Sheet/core/createSheet";

const LazyMapContent = React.lazy(() =>
  import("@/modules/map/containers/map-content").then((m) => ({ default: m.MapContent })),
);

const MapContentWrapper = () => (
  <Suspense fallback={null}>
    <LazyMapContent />
  </Suspense>
);

/** Sheet для просмотра карты (MapContent). */
export const mapContentSheet = createSheet(MapContentWrapper, {
  noHeader: true,
  padding: 0,
  height: "95vh",
  width: "1000px",
  withoutButtons: true,
  withoutTitle: true,
});

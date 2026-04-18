import { useAppDispatch } from "@/hooks/useAppDispatch";
import { onCloseMapContentThunk, onOpenMapContentThunk } from "@/modules/map/containers/map-content/slice";
import { buildMapContentSheetId } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { MAP_CONTENT_SHEET_CONFIG } from "@/modules/map/containers/map-view-modal/mapViewSheets";
import { SheetKind } from "@/ui/Sheet/core/sheetKind";
import { pushSheet, removeSheet, selectSheetStack } from "@/ui/Sheet/slice";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useStore } from "react-redux";
import type { RootState } from "@/store";

export const MapsByIdController = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();
  const id = Number(router.query.id);
  const sheetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!id || Number.isNaN(id)) return;

    const expectedId = buildMapContentSheetId(id);
    const existing = selectSheetStack(store.getState()).find((e) => e.id === expectedId);

    if (existing) {
      sheetIdRef.current = existing.id;
    } else {
      sheetIdRef.current = expectedId;
      dispatch(
        pushSheet({
          id: expectedId,
          kind: SheetKind.MapContent,
          props: {},
          config: MAP_CONTENT_SHEET_CONFIG,
        }),
      );
      dispatch(onOpenMapContentThunk({ levelId: id }));
    }

    const unsubscribe = store.subscribe(() => {
      const sheetId = sheetIdRef.current;
      if (!sheetId) return;
      const exists = selectSheetStack(store.getState()).some((e) => e.id === sheetId);
      if (!exists) {
        sheetIdRef.current = null;
        router.push("/maps");
      }
    });

    return () => {
      unsubscribe();
      const sheetId = sheetIdRef.current;
      sheetIdRef.current = null;
      if (sheetId) {
        dispatch(removeSheet(sheetId));
      }
      dispatch(onCloseMapContentThunk());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return null;
};

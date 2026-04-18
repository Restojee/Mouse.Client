import { useCallback } from "react";
import { useGlobalKeyDown } from "@/hooks/useGlobalKeyDown";
import { Map } from "@/api/codegen/genMouseMapsApi";
import { setAppMessage } from "@/bll/appReducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { onOpenMapContentThunk } from "@/modules/map/containers/map-content/slice";
import { MAP_CONTENT_SHEET_CONFIG } from "@/modules/map/containers/map-view-modal/mapViewSheets";
import { SheetKind } from "@/ui/Sheet/core/sheetKind";
import { pushSheet, selectSheetStack } from "@/ui/Sheet/slice";
import { useRouter } from "next/router";
import { useStore } from "react-redux";
import type { RootState } from "@/store";

export const buildMapContentSheetId = (mapId: number) => `mapcontent-${mapId}`;

export const useMapView = () => {
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();
  const router = useRouter();
  const id = Number(router.query.id);

  const openMap = useCallback(
    async (mapId: Map["id"]): Promise<void> => {
      if (mapId == null) return;
      const sheetId = buildMapContentSheetId(mapId);
      const alreadyOpen = selectSheetStack(store.getState()).some((e) => e.id === sheetId);
      if (!alreadyOpen) {
        dispatch(
          pushSheet({
            id: sheetId,
            kind: SheetKind.MapContent,
            props: {},
            config: MAP_CONTENT_SHEET_CONFIG,
          }),
        );
        dispatch(onOpenMapContentThunk({ levelId: mapId }));
      }
      const { id: _ignored, ...rest } = router.query;
      router
        .push({ pathname: "/maps/[id]", query: { ...rest, id: String(mapId) } })
        .catch(() => dispatch(setAppMessage({ severity: "error", text: "Ошибка открытия карты" })));
    },
    [router, dispatch, store],
  );

  const closeMap = useCallback(async () => {
    const { id: _ignored, ...rest } = router.query;
    await router.push({ pathname: "/maps", query: rest });
  }, [router]);

  useGlobalKeyDown({
    Escape: closeMap,
  });

  return {
    levelId: id,
    openMap,
    closeMap,
  };
};

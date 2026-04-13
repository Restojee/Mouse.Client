import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { onOpenMapContentThunk } from "../map-content/slice";
import { useMapView } from "./hooks/useMapView";
import { mapContentSheet } from "./mapViewSheets";

export const useMapViewModal = () => {
  const dispatch = useAppDispatch();
  const { levelId, closeMap } = useMapView();

  useEffect(() => {
    if (!levelId) return;
    dispatch(onOpenMapContentThunk({ levelId }));
    let closedByEffect = false;
    mapContentSheet.show().then(() => {
      if (!closedByEffect) closeMap();
    });
    return () => {
      closedByEffect = true;
      mapContentSheet.close();
    };
  }, [levelId]);
};

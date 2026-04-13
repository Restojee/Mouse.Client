import { Map } from "@/api/codegen/genMouseMapsApi";
import { routes } from "@/common/routes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  copyTextThunk,
  deleteMapThunk,
  selectMapContent,
  toggleMapFavoriteThunk,
  updateMapImageThunk,
} from "@/modules/map/containers/map-content/slice";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const useMap = (levelId?: Map["id"]) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const map = useAppSelector(selectMapContent);

  const onToggleMapFavorite = useCallback(
    (isFavorite: boolean): void => {
      if (levelId) {
        dispatch(toggleMapFavoriteThunk({ levelId, isFavorite }));
      }
    },
    [dispatch, levelId],
  );

  const onMapDelete = useCallback(async (): Promise<void> => {
    if (levelId) {
      const res = await dispatch(deleteMapThunk({ levelId }));
      if (res.payload) {
        await router.push({ pathname: routes.MAPS, query: {} });
      }
    }
  }, [dispatch, levelId, router]);

  const onMapImageUpdate = useCallback(
    async (file: string) => {
      if (levelId) {
        const res = await dispatch(updateMapImageThunk({ levelId, file }));
        return res.payload;
      }
    },
    [dispatch, levelId],
  );

  const onMapShare = useCallback((): void => {
    dispatch(copyTextThunk(window.location.href));
  }, [dispatch]);

  const onMapNameCopy = useCallback(
    (name: Map["name"]): void => {
      dispatch(copyTextThunk(`!map ${name}`));
    },
    [dispatch],
  );

  return {
    map,
    onMapDelete,
    onToggleMapFavorite,
    onMapShare,
    onMapNameCopy,
    onMapImageUpdate,
  };
};

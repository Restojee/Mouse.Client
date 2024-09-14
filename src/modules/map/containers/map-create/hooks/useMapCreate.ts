import { Map, Tag } from "@/api/codegen/genMouseMapsApi";
import { setAppMessage } from "@/bll/appReducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useDebounce } from "@/hooks/useDebounce";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import {
  createMapThunk,
  selectCompletedMapImage,
  selectMapImage,
  selectMapName,
  selectMapTags,
  setCompletedMapImage,
  setMapImage,
  setMapName,
  setMapTagIds,
} from "@/modules/map/containers/map-create/slice";
import { getMapByNameThunk } from "@/modules/map/containers/map-list/slice";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";

export const useMapCreate = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const name = useAppSelector(selectMapName);
  const tags = useAppSelector(selectMapTags);
  const image = useAppSelector(selectMapImage);
  const completedMapImage = useAppSelector(selectCompletedMapImage);

  const { updateFilter, query, removeQuery } = useFilterQueryParams();

  const debounceSearchByName = useDebounce<string>(async (name: string) => {
    await updateFilter({ name });
  }, 600);

  const onTagsChange = useCallback(
    (tags: Tag["id"][]): void => {
      dispatch(setMapTagIds(tags));
    },
    [dispatch],
  );

  const onImageChange = useCallback(
    (image: string): void => {
      dispatch(setMapImage(image));
    },
    [dispatch],
  );

  const onCompletedMapImageChange = useCallback(
    (image: string): void => {
      dispatch(setCompletedMapImage(image));
    },
    [dispatch],
  );

  const onNameChange = useCallback(
    (name: Map["name"]): void => {
      if (!name) {
        return;
      }
      dispatch(setMapName(name));
      debounceSearchByName(name);
    },
    [debounceSearchByName, dispatch],
  );

  const clearForm = useCallback(() => {
    removeQuery(["name"]);
    dispatch(setMapImage(""));
    dispatch(setCompletedMapImage(""));
    dispatch(setMapName(""));
    dispatch(setMapTagIds([]));
  }, [dispatch, removeQuery]);

  const onMapCreate = useCallback(async (): Promise<void> => {
    const nameLength = name?.trim().length;
    if (nameLength && nameLength < 10) {
      const getMapByName = await dispatch(getMapByNameThunk({ name }));
      const map = getMapByName.payload as Map;

      if (map?.name === name) {
        dispatch(createMapThunk({ id: map?.id }));
        return;
      }

      dispatch(createMapThunk({}));
      clearForm();
    } else {
      dispatch(setAppMessage({ severity: "error", text: "Некорректный номер карты" }));
    }
  }, [clearForm, dispatch, name]);

  const isValid = useMemo((): boolean => {
    return name ? name.trim().length > 1 : false;
  }, [name]);

  useEffect(() => {
    if (query.name && !name?.length && router.isReady) {
      dispatch(setMapName(query.name));
    }
  }, [router.isReady]);

  return {
    name,
    image,
    completedMapImage,
    tags,
    setName: onNameChange,
    setImage: onImageChange,
    setTags: onTagsChange,
    setCompletedMapImage: onCompletedMapImageChange,
    onMapCreate,
    isValid,
  };
};

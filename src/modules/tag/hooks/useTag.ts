import { Tag, UpdateTagApiArg } from "@/api/codegen/genMouseMapsApi";
import { setAppModalType } from "@/bll/appReducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectMapTags, setMapTagIds } from "@/modules/map/containers";
import {
  selectSelectedTagIds,
  toggleSelectedTagById,
  updateMapTagsThunk,
} from "@/modules/map/containers/map-content/slice";
import {
  createTagThunk,
  deleteTagThunk,
  selectTagModalType,
  selectTags,
  setTagModalType,
  updateTagThunk,
} from "@/modules/tag";
import { TagModalTypes } from "@/modules/tag/types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useTag = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const levelId = useMemo(() => {
    return router.query.levelId;
  }, [router.query.levelId]);

  const selectedTagIds = useAppSelector(selectSelectedTagIds);
  const modalType = useAppSelector(selectTagModalType);
  const selectedIdForCreateMap = useAppSelector(selectMapTags);
  const tagsList = useAppSelector(selectTags);

  const [selectedTagIdsForCreateMap, setSelectedTagIdsForCreateMap] = useState<Tag["id"][]>(
    selectedIdForCreateMap || [],
  );

  const onTagCreate = useCallback(
    async (name: string) => {
      if (name.trim().length) {
        return dispatch(createTagThunk({ name }));
      }
    },
    [dispatch],
  );

  const onOpenModal = useCallback(
    (modalType: TagModalTypes): void => {
      if (modalType === "map-tags-update") {
        dispatch(setAppModalType("map-tags-update"));
        return;
      }
      dispatch(setTagModalType(modalType));
    },
    [dispatch],
  );

  const onCloseModal = useCallback((): void => {
    dispatch(setAppModalType(null));
    dispatch(setTagModalType(null));
  }, [dispatch]);

  const onTagDelete = useCallback(
    async (tagId: Tag["id"] | null) => {
      try {
        if (tagId) {
          await dispatch(deleteTagThunk({ tagId }));
          onCloseModal();
          return true;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    [dispatch, onCloseModal],
  );

  const onTagUpdate = useCallback(
    async (arg: UpdateTagApiArg["updateTagRequest"]) => {
      try {
        if (arg) {
          await dispatch(updateTagThunk(arg));
          onCloseModal();
        }
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, onCloseModal],
  );

  const updateMapTags = useCallback((): void => {
    const id = Number(levelId);
    if (levelId) {
      dispatch(updateMapTagsThunk(id));
    } else {
      dispatch(setMapTagIds(selectedTagIdsForCreateMap));
      onCloseModal();
    }
  }, [dispatch, levelId, onCloseModal, selectedTagIdsForCreateMap]);

  const toggleSelectedTag = useCallback(
    (id: Tag["id"]) => {
      if (id && levelId) {
        dispatch(toggleSelectedTagById(id));
        return;
      }

      if (id && !selectedTagIdsForCreateMap?.includes(id)) {
        setSelectedTagIdsForCreateMap((prev) => [...prev, id]);
        return;
      }
      if (id && selectedTagIdsForCreateMap?.includes(id)) {
        const filteredTagIds = selectedTagIdsForCreateMap.filter((tagId) => tagId !== id);
        setSelectedTagIdsForCreateMap(filteredTagIds);
        return;
      }
    },
    [dispatch, levelId, selectedTagIdsForCreateMap],
  );

  const checkIsSelectedTagId = useCallback(
    (id: Tag["id"]) => {
      if (id && levelId) {
        return selectedTagIds.includes(id);
      }

      if (id && !levelId) {
        return selectedTagIdsForCreateMap.includes(id);
      }
      return false;
    },
    [levelId, selectedTagIds, selectedTagIdsForCreateMap],
  );

  useEffect(() => {
    if (!selectedIdForCreateMap?.length) {
      setSelectedTagIdsForCreateMap([]);
    }
  }, [selectedIdForCreateMap]);

  return {
    onTagCreate,
    onTagDelete,
    onTagUpdate,
    tagsList,
    onCloseModal,
    modalType,
    onOpenModal,
    updateMapTags,
    toggleSelectedTag,
    checkIsSelectedTagId,
    selectedIdForCreateMap,
  };
};

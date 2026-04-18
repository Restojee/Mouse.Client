import { Tag, UpdateTagApiArg } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectMapTags, setMapTagIds } from "@/modules/map/containers";
import {
  selectMapContent,
  selectSelectedTagIds,
  setSelectedTagIds,
  toggleSelectedTagById,
  updateMapTagsThunk,
} from "@/modules/map/containers/map-content/slice";
import {
  closeTagModalThunk,
  createTagThunk,
  deleteTagThunk,
  selectEditingTag,
  selectTagModalType,
  selectTags,
  setEditingTag,
  setTagModalType,
  updateTagFlowThunk,
} from "@/modules/tag";
import { TagModalTypes } from "@/modules/tag/types";
import { tagsUpdateSheet, confirmSheet } from "@/modules/tag/tagSheets";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

export const useTag = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const levelId = useMemo(() => router.query.levelId, [router.query.levelId]);

  const selectedTagIds = useAppSelector(selectSelectedTagIds);
  const modalType = useAppSelector(selectTagModalType);
  const editingTag = useAppSelector(selectEditingTag);
  const selectedIdForCreateMap = useAppSelector(selectMapTags);
  const mapContent = useAppSelector(selectMapContent);
  const tagsList = useAppSelector(selectTags);

  const onOpenTagModal = useCallback(
    (modalType: TagModalTypes): void => {
      dispatch(setTagModalType(modalType));
    },
    [dispatch],
  );

  const onCloseModal = useCallback((): void => {
    dispatch(closeTagModalThunk());
  }, [dispatch]);

  const onTagCreate = useCallback(
    (name: string) => {
      return dispatch(createTagThunk({ name }));
    },
    [dispatch],
  );

  const onTagDelete = useCallback(
    (tagId: Tag["id"]) => {
      confirmSheet.show({ text: "Вы действительно хотите удалить тег?" }).then((confirmed) => {
        if (confirmed && tagId) {
          dispatch(deleteTagThunk({ tagId }));
        }
      });
    },
    [dispatch],
  );

  const onTagUpdate = useCallback(
    (arg: UpdateTagApiArg["updateTagRequest"]) => {
      dispatch(updateTagFlowThunk(arg));
    },
    [dispatch],
  );

  const commitDraft = useCallback((): void => {
    dispatch((innerDispatch, getState) => {
      const id = Number(levelId);
      const draft = selectSelectedTagIds(getState()) || [];
      if (levelId) {
        innerDispatch(updateMapTagsThunk(id));
      } else {
        innerDispatch(setMapTagIds(draft));
      }
    });
  }, [dispatch, levelId]);

  const toggleSelectedTag = useCallback(
    (id: Tag["id"]) => {
      if (!id) return;
      dispatch(toggleSelectedTagById(id));
    },
    [dispatch],
  );

  const checkIsSelectedTagId = useCallback(
    (id: Tag["id"]) => {
      if (!id) return false;
      return selectedTagIds.includes(id);
    },
    [selectedTagIds],
  );

  const openTagsModal = useCallback(async () => {
    const initial: number[] = levelId
      ? mapContent?.tags?.map((tag) => tag.id as number) || []
      : (selectedIdForCreateMap || []).filter((id): id is number => id !== undefined);
    dispatch(setSelectedTagIds(initial));

    const confirmed = await tagsUpdateSheet.show();

    if (confirmed) {
      commitDraft();
    } else {
      dispatch(setSelectedTagIds(initial));
    }
  }, [dispatch, levelId, mapContent?.tags, selectedIdForCreateMap, commitDraft]);

  const openTagUpdateModal = useCallback(
    (tag: Tag) => {
      dispatch(setEditingTag(tag));
      dispatch(setTagModalType("tag-update"));
    },
    [dispatch],
  );

  const openTagDeleteModal = useCallback(
    async (tag: Tag) => {
      const confirmed = await confirmSheet.show({ text: "Вы действительно хотите удалить тег?" });
      if (confirmed && tag.id) {
        await dispatch(deleteTagThunk({ tagId: tag.id }));
        dispatch(setEditingTag(null));
      }
    },
    [dispatch],
  );

  return {
    onTagCreate,
    onTagDelete,
    onTagUpdate,
    tagsList,
    onCloseModal,
    modalType,
    editingTag,
    onOpenTagModal,
    updateMapTags: commitDraft,
    toggleSelectedTag,
    checkIsSelectedTagId,
    selectedIdForCreateMap,
    openTagsModal,
    openTagUpdateModal,
    openTagDeleteModal,
  };
};

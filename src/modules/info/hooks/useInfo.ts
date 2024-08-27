import { CreateTipApiArg, Tip, UpdateTipApiArg } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  createInfoThunk,
  removeInfoThunk,
  selectInfoList,
  selectIsInfoCreateModalOpen,
  selectIsInfoFetching,
  selectSelectedInfo,
  setIsCreateModalOpen,
  setSelectedInfo,
  updateInfoThunk,
} from "@/modules/info/slice";
import { useCallback } from "react";

export const useInfo = () => {
  const dispatch = useAppDispatch();
  const infoList = useAppSelector(selectInfoList);
  const isInfoCreateModalOpen = useAppSelector(selectIsInfoCreateModalOpen);
  const isInfoFetching = useAppSelector(selectIsInfoFetching);
  const selectedInfo = useAppSelector(selectSelectedInfo);

  const onModalClose = useCallback(() => {
    dispatch(setIsCreateModalOpen(false));
    dispatch(setSelectedInfo(null));
  }, [dispatch]);

  const onModalOpen = useCallback(() => {
    dispatch(setIsCreateModalOpen(true));
  }, [dispatch]);

  const createInfo = useCallback(
    async (arg: CreateTipApiArg) => {
      const isCreated = await dispatch(createInfoThunk(arg));
      if (isCreated.payload) {
        onModalClose();
      }
    },
    [dispatch, onModalClose],
  );

  const updateInfo = useCallback(
    async (arg: UpdateTipApiArg) => {
      const isCreated = await dispatch(updateInfoThunk(arg));
      if (isCreated.payload) {
        onModalClose();
      }
    },
    [dispatch, onModalClose],
  );

  const removeInfo = useCallback(
    async (id: Tip["id"]) => {
      if (id) {
        await dispatch(removeInfoThunk({ tipId: id }));
      }
    },
    [dispatch],
  );

  const selectInfo = useCallback(
    async (info: Tip) => {
      dispatch(setSelectedInfo(info));
      onModalOpen();
    },
    [dispatch, onModalOpen],
  );

  return {
    infoList,
    createInfo,
    updateInfo,
    removeInfo,
    selectInfo,
    onModalOpen,
    onModalClose,
    selectedInfo,
    isInfoFetching,
    isInfoCreateModalOpen,
  };
};

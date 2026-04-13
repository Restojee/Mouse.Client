import { CreateTipApiArg, Tip, UpdateTipApiArg } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  closeInfoModalThunk,
  createInfoThunk,
  removeInfoThunk,
  selectInfoList,
  selectIsInfoCreateModalOpen,
  selectIsInfoFetching,
  selectSelectedInfo,
  setSelectedInfo,
  updateInfoThunk,
} from "@/modules/info/slice";
import { createInfoSheet } from "@/modules/info/infoSheets";
import { useCallback } from "react";

export const useInfo = () => {
  const dispatch = useAppDispatch();
  const infoList = useAppSelector(selectInfoList);
  const isInfoCreateModalOpen = useAppSelector(selectIsInfoCreateModalOpen);
  const isInfoFetching = useAppSelector(selectIsInfoFetching);
  const selectedInfo = useAppSelector(selectSelectedInfo);

  const onModalClose = useCallback(() => {
    dispatch(closeInfoModalThunk());
  }, [dispatch]);

  const onModalOpen = useCallback(() => {
    createInfoSheet
      .show({}, { title: selectedInfo ? "Редактировать" : "Добавить полезную инфу" })
      .then(() => onModalClose());
  }, [onModalClose, selectedInfo]);

  const createInfo = useCallback(
    (arg: CreateTipApiArg) => {
      dispatch(createInfoThunk(arg));
    },
    [dispatch],
  );

  const updateInfo = useCallback(
    (arg: UpdateTipApiArg) => {
      dispatch(updateInfoThunk(arg));
    },
    [dispatch],
  );

  const removeInfo = useCallback(
    (id: Tip["id"]) => {
      if (id) {
        dispatch(removeInfoThunk({ tipId: id }));
      }
    },
    [dispatch],
  );

  const selectInfo = useCallback(
    (info: Tip) => {
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

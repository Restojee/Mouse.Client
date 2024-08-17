import { AppModalTypes, selectAppModalType, setAppModalType } from "@/bll/appReducer";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const usePopup = (key: AppModalTypes) => {
  const dispatch = useDispatch();
  const modalType = useSelector(selectAppModalType);

  const onOpen = useCallback(() => {
    dispatch(setAppModalType(key));
  }, [key]);

  const onClose = useCallback(() => {
    dispatch(setAppModalType(null));
  }, [key]);

  return {
    isOpen: modalType === key,
    onOpen,
    onClose,
  };
};

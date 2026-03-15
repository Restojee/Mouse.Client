import { setAppMessage } from "@/bll/appReducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useCallback } from "react";

export const useAppNotifications = () => {
  const dispatch = useAppDispatch();

  const onError = useCallback(
    (text: string) => {
      dispatch(setAppMessage({ severity: "error", text }));
    },
    [dispatch],
  );

  const onSuccess = useCallback(
    (text: string) => {
      dispatch(setAppMessage({ severity: "success", text }));
    },
    [dispatch],
  );

  return { onError, onSuccess };
};

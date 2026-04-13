import { RegisterRequest } from "@/api/codegen/genMouseMapsApi";
import { setAppMessage } from "@/bll/appReducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useQueryParams } from "@/hooks/useQueryParams";
import { registerThunk } from "@/modules/auth/slice";
import { registerSheet } from "@/modules/auth/authSheets";
import { useCallback } from "react";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const { removeQueryParam } = useQueryParams();

  const onRegisterModalOpen = useCallback(() => {
    registerSheet.show();
  }, []);

  const onRegisterModalClose = useCallback(() => {
    removeQueryParam("invite");
    registerSheet.close();
  }, [removeQueryParam]);

  const register = useCallback(
    async (data: RegisterRequest) => {
      try {
        await dispatch(registerThunk(data));
        onRegisterModalClose();
      } catch (err) {
        dispatch(setAppMessage({ severity: "error", text: "Ошибка регистрации" }));
      }
    },
    [dispatch, onRegisterModalClose],
  );

  return {
    onRegisterModalClose,
    onRegisterModalOpen,
    register,
  };
};

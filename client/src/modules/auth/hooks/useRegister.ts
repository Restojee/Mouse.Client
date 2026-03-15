import { RegisterRequest } from "@/api/codegen/genMouseMapsApi";
import { setAppMessage, setAppModalType } from "@/bll/appReducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useQueryParams } from "@/hooks/useQueryParams";
import { registerThunk } from "@/modules/auth/slice";
import { useCallback } from "react";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const { removeQueryParam } = useQueryParams();

  const onRegisterModalClose = useCallback(() => {
    removeQueryParam("invite");
    dispatch(setAppModalType(null));
  }, [dispatch, removeQueryParam]);

  const onRegisterModalOpen = useCallback(() => {
    dispatch(setAppModalType("register"));
  }, [dispatch]);

  const register = async (data: RegisterRequest) => {
    try {
      await dispatch(registerThunk(data));
      onRegisterModalClose();
    } catch (err) {
      dispatch(setAppMessage({ severity: "error", text: "Ошибка регистрации" }));
    }
  };

  return {
    onRegisterModalClose,
    onRegisterModalOpen,
    register,
  };
};

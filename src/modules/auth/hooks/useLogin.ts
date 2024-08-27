import { LoginRequest } from "@/api/codegen/genMouseMapsApi";
import { setAppMessage, setAppModalType } from "@/bll/appReducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loginThunk, logoutThunk } from "@/modules/auth/slice";
import { useCallback } from "react";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const onLoginModalClose = useCallback(() => {
    dispatch(setAppModalType(null));
  }, [dispatch]);

  const onLoginModalOpen = useCallback(() => {
    dispatch(setAppModalType("login"));
  }, [dispatch]);

  const login = async (data: LoginRequest) => {
    try {
      const res = await dispatch(loginThunk(data));
      if (res.payload) {
        onLoginModalClose();
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setAppMessage({ severity: "error", text: "Ошибка авторизации" }));
    }
  };

  const logout = async () => {
    dispatch(logoutThunk());
  };

  return {
    onLoginModalClose,
    onLoginModalOpen,
    login,
    logout,
  };
};

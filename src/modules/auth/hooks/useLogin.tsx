import { LoginRequest } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loginThunk, logoutThunk } from "@/modules/auth/slice";
import { loginSheet } from "@/modules/auth/authSheets";
import { setAppMessage } from "@/bll/appReducer";
import { useCallback } from "react";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const onLoginModalOpen = useCallback(() => {
    loginSheet.show();
  }, []);

  const onLoginModalClose = useCallback(() => {
    loginSheet.close();
  }, []);

  const login = useCallback(
    async (data: LoginRequest) => {
      const res = await dispatch(loginThunk(data));
      if (loginThunk.fulfilled.match(res)) {
        loginSheet.close();
      } else {
        dispatch(setAppMessage({ severity: "error", text: "Ошибка авторизации" }));
      }
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  return {
    onLoginModalOpen,
    onLoginModalClose,
    login,
    logout,
  };
};

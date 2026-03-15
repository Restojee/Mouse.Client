import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useRegister } from "@/modules/auth/hooks/useRegister";
import { getCurrentUserThunk, selectIsAuth } from "@/modules/auth/slice";
import { ReactElement, useEffect } from "react";

type AuthProviderProps = {
  children: ReactElement;
};
export const AuthProvider = (props: AuthProviderProps) => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const { query, removeQueryParam } = useQueryParams();
  const { onRegisterModalOpen, onRegisterModalClose } = useRegister();

  useEffect(() => {
    if (isAuth && query.invite) {
      removeQueryParam("invite");
      onRegisterModalClose();
    }

    if (query.invite) {
      onRegisterModalOpen();
    }
  }, [query]);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(getCurrentUserThunk());
    }, 300000);

    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [isAuth]);

  return props.children;
};

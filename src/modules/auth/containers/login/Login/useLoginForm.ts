import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginRequest } from "@/api/codegen/genMouseMapsApi";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { loginValidateSchema } from "@/modules/auth/schemas/loginValidateSchema";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setAppMessage } from "@/bll/appReducer";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const { login } = useLogin();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginValidateSchema),
  });

  const [isInviteHintOpen, setIsInviteHintOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submit = useCallback(
    async (data: LoginRequest) => {
      try {
        setIsLoading(true);
        await login(data);
      } finally {
        setIsLoading(false);
      }
    },
    [login],
  );

  const onSubmit = handleSubmit(submit);

  const onToggleInviteHint = useCallback(() => {
    setIsInviteHintOpen((prev) => !prev);
  }, []);

  const onGoogleLogin = useCallback(() => {
    dispatch(
      setAppMessage({
        severity: "info",
        text: "Авторизация через Google скоро появится",
      }),
    );
  }, [dispatch]);

  const onForgotPassword = useCallback(() => {
    dispatch(
      setAppMessage({
        severity: "info",
        text: "Восстановление пароля пока недоступно",
      }),
    );
  }, [dispatch]);

  return {
    control,
    errors,
    isLoading,
    isInviteHintOpen,
    onSubmit,
    onToggleInviteHint,
    onGoogleLogin,
    onForgotPassword,
  };
};

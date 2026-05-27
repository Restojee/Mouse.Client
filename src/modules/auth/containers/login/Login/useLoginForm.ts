import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { LoginRequest } from "@/api/codegen/genMouseMapsApi";
import { setAppMessage } from "@/bll/appReducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { loginValidateSchema } from "@/modules/auth/schemas/loginValidateSchema";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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

  const onForgotPassword = useCallback(() => {
    dispatch(
      setAppMessage({
        severity: "info",
        text: "Восстановление пароля пока недоступно",
      }),
    );
  }, [dispatch]);

  const onPrivacyPolicyOpen = useCallback(() => {
    const from = router.asPath || "/maps";
    router.push({ pathname: "/privacy", query: { from } }).catch(() => undefined);
  }, [router]);

  return {
    control,
    errors,
    isLoading,
    isInviteHintOpen,
    onSubmit,
    onToggleInviteHint,
    onForgotPassword,
    onPrivacyPolicyOpen,
  };
};

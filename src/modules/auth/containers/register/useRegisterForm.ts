import { RegisterRequest } from "@/api/codegen/genMouseMapsApi";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useRegister } from "@/modules/auth/hooks/useRegister";
import { privacyPolicySheet } from "@/modules/auth/authSheets";
import { RegisterFormValues, registerValidation } from "@/modules/auth/schemas/registerValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export const useRegisterForm = () => {
  const router = useRouter();
  const { register } = useRegister();
  const { theme } = useAppTheme();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = useMemo<Partial<RegisterFormValues>>(
    () => ({
      inviteToken: router.query.invite as string,
      personalDataAccepted: false,
    }),
    [router.query.invite],
  );

  const form = useForm<RegisterFormValues>({
    resolver: yupResolver(registerValidation),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data: RegisterFormValues) => {
      const payload: RegisterRequest = {
        userName: data.userName,
        password: data.password,
        inviteToken: data.inviteToken,
      };

      try {
        setIsLoading(true);
        await register(payload);
      } finally {
        setIsLoading(false);
      }
    },
    [register],
  );

  const openPrivacyPolicy = useCallback(() => {
    privacyPolicySheet.show();
  }, []);

  const submitHandler = form.handleSubmit(onSubmit);
  const submitButtonColor = theme.colors.brandColorContrastText;
  const isSubmitDisabled = isLoading || !form.watch("personalDataAccepted");

  return {
    control: form.control,
    errors: form.formState.errors,
    isLoading,
    submitButtonColor,
    isSubmitDisabled,
    submitHandler,
    openPrivacyPolicy,
  };
};

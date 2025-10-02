import { inviteApi } from "@/api/inviteApi";
import { useAppNotifications } from "@/hooks/useAppNotifications";
import { useAppTheme } from "@/hooks/useAppTheme";
import { StyledDrawerHeader } from "@/layout/drawer/styled";
import { getInviteLink } from "@/modules/auth";
import { useUser } from "@/modules/user/hooks/useUser";
import { StyledBox } from "@/ui/Box";
import { Button } from "@/ui/Button";
import { Input, PasswordInput } from "@/ui/Input";
import { Typography } from "@/ui/Typography";
import { UpdateAvatar } from "@/ui/UpdateAvatar/UpdateAvatar";
import React, { useCallback, useState } from "react";
import { authApi } from "@/api/authApi";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordForm, changePasswordValidation } from "@/modules/auth/schemas/changePasswordValidation";

export const Settings = () => {
  const { onError, onSuccess } = useAppNotifications();
  const { currentUser, updateUserImage } = useUser();
  const { theme } = useAppTheme();

  const [image, setImage] = useState(currentUser?.avatar);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(changePasswordValidation),
    defaultValues: { password: undefined, confirmPassword: undefined },
  });
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [confirmError, setConfirmError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = useCallback(
    (field: ControllerRenderProps<ChangePasswordForm, "password">) => (e: React.ChangeEvent<HTMLInputElement>) => {
      field.onChange(e);
      const val = e.target.value;
      setPasswordValue(val);
      if (confirmError && val === confirmValue) {
        setConfirmError(undefined);
      }
    },
    [confirmError, confirmValue],
  );

  const handleConfirmPasswordChange = useCallback(
    (field: ControllerRenderProps<ChangePasswordForm, "confirmPassword">) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(e);
        const val = e.target.value;
        setConfirmValue(val);
        setConfirmError(passwordValue && val && passwordValue !== val ? "Пароли не совпадают" : undefined);
      },
    [passwordValue],
  );

  const isImageChanged = currentUser?.avatar !== image;

  const onSubmitHandler = async (data?: ChangePasswordForm) => {
    if (image && isImageChanged) {
      setIsLoading(true);
      try {
        await updateUserImage(image);
      } catch (e) {
        // ignore
      } finally {
        setIsLoading(false);
      }
    }

    const password = data?.password;
    const confirm = data?.confirmPassword;

    if (!confirm && !password) {
      return;
    }

    try {
      if (password || confirm) {
        setIsLoading(true);
        await authApi.changePassword({ newPassword: password as string });
        onSuccess("Пароль изменён");
        setPasswordValue("");
        setConfirmValue("");
        setConfirmError(undefined);
        reset({ password: undefined, confirmPassword: undefined });
      }
    } catch (err) {
      onError("Не удалось изменить пароль");
    } finally {
      setIsLoading(false);
    }
  };

  const onInviteCopy = useCallback(async () => {
    try {
      const { token } = await inviteApi.createInviteToken({ email: currentUser?.username || "Не указано" });
      if (!token) {
        return;
      }

      const link = getInviteLink(token);

      await navigator.clipboard.writeText(link);
      onSuccess("Ссылка скопирована");
    } catch (error) {
      onError("Ошибка копирования");
    }
  }, [currentUser?.username, onError, onSuccess]);

  return (
    <StyledBox
      direction="column"
      padding="0 20px 20px 20px"
      overflow={"auto"}
      grow={1}
    >
      <StyledDrawerHeader>
        <Typography>Мои данные</Typography>
      </StyledDrawerHeader>
      <form
        autoComplete={"off"}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <StyledBox
          align={"center"}
          direction={"column"}
          gap={20}
          padding={"20px 0 0 0"}
        >
          <UpdateAvatar
            onChange={setImage}
            size={120}
            currentImage={image}
          />
          <Input
            name={"name"}
            title={"Логин"}
            value={currentUser?.username}
            disabled
          />
          <Controller
            control={control}
            name={"password"}
            render={({ field }) => (
              <PasswordInput
                name={field.name}
                onChange={handlePasswordChange(field)}
                onBlur={field.onBlur}
                disabled={field.disabled || isLoading}
                value={passwordValue}
                autoComplete={"new-password"}
                title={"Новый пароль"}
                placeholder={"Введите пароль"}
                error={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name={"confirmPassword"}
            render={({ field }) => (
              <PasswordInput
                name={field.name}
                onChange={handleConfirmPasswordChange(field)}
                onBlur={field.onBlur}
                disabled={field.disabled || isLoading}
                value={confirmValue}
                autoComplete={"new-password"}
                title={"Подтвердите пароль"}
                placeholder={"Подтвердите новый пароль"}
                error={errors.confirmPassword?.message || confirmError}
              />
            )}
          />
          <Button
            disabled={isLoading || (!isImageChanged && !confirmValue) || !!confirmError}
            type={"submit"}
            label={"Сохранить"}
            color={theme.colors.brandColorContrastText}
          />
        </StyledBox>
      </form>
      <StyledBox
        align={"center"}
        direction={"column"}
        padding={"20px 0 0 0"}
      >
        <StyledDrawerHeader>
          <Typography>Приглашение для друга</Typography>
        </StyledDrawerHeader>
        <StyledBox
          fontSize={"0.8rem"}
          padding={"0px 10px 20px"}
          opacity={0.7}
          textAlign={"center"}
          borderRadius={15}
          style={{ lineHeight: 1.5 }}
        >
          Получите одноразовую ссылку-приглашение для регистрации. Помните, что ссылка не должна попасть в плохие руки!
        </StyledBox>
        <Button
          onClick={onInviteCopy}
          label={"Скопировать"}
          color={theme.colors.brandColorContrastText}
        />
      </StyledBox>
    </StyledBox>
  );
};

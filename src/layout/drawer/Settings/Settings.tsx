import { inviteApi } from "@/api/inviteApi";
import { useAppNotifications } from "@/hooks/useAppNotifications";
import { useAppTheme } from "@/hooks/useAppTheme";
import drawerStyles from "@/layout/drawer/Drawer.module.scss";
import settingsStyles from "@/layout/drawer/Settings/Settings.module.scss";
import { getInviteLink } from "@/modules/auth";
import { useUser } from "@/modules/user/hooks/useUser";
import { Button } from "@/ui/Button";
import { Input, PasswordInput } from "@/ui/Input";
import { Typography } from "@/ui/Typography";
import { UpdateAvatar } from "@/ui/UpdateAvatar/UpdateAvatar";
import React, { useCallback, useState } from "react";
import { authApi } from "@/api/authApi";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordForm, changePasswordValidation } from "@/modules/auth/schemas/changePasswordValidation";
import { useRouter } from "next/router";

export const Settings = () => {
  const router = useRouter();
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

  const onPrivacyPolicyOpen = useCallback(() => {
    const from = router.asPath || "/maps";
    router.push({ pathname: "/privacy", query: { from } }).catch(() => undefined);
  }, [router]);

  return (
    <div className={settingsStyles.settingsContainer}>
      <div className={drawerStyles.drawerHeader}>
        <Typography>Мои данные</Typography>
      </div>
      <form
        autoComplete={"off"}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className={settingsStyles.settingsForm}>
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
        </div>
      </form>
      <div className={settingsStyles.inviteSection}>
        <div className={drawerStyles.drawerHeader}>
          <Typography>Приглашение для друга</Typography>
        </div>
        <div className={settingsStyles.inviteText}>
          Получите одноразовую ссылку-приглашение для регистрации. Помните, что ссылка не должна попасть в плохие руки!
        </div>
        <Button
          onClick={onInviteCopy}
          label={"Скопировать"}
          color={theme.colors.brandColorContrastText}
        />
      </div>
      <div className={settingsStyles.policySection}>
        <div className={settingsStyles.policyDivider} />
        <button
          type="button"
          className={settingsStyles.policyLink}
          onClick={onPrivacyPolicyOpen}
        >
          Политика конфиденциальности
        </button>
      </div>
    </div>
  );
};

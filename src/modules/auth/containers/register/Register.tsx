import { Controller } from "react-hook-form";
import { Box } from "@/ui/Box";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form/Form";
import { Input, PasswordInput } from "@/ui/Input";
import { Typography } from "@/ui/Typography";
import { PersonalDataConsent } from "./PersonalDataConsent/PersonalDataConsent";
import { useRegisterForm } from "./useRegisterForm";

export const Register = () => {
  const { control, errors, isLoading, submitButtonColor, isSubmitDisabled, submitHandler, openPrivacyPolicy } =
    useRegisterForm();

  return (
    <Form onSubmit={submitHandler}>
      <Box
        direction={"column"}
        width={"100%"}
        gap={30}
      >
        <Typography
          fontSize={"1.5rem"}
          margin={"0 0 10px 0"}
        >
          Регистрация
        </Typography>
        <Controller
          control={control}
          name={"userName"}
          render={({ field }) => (
            <Input
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled || isLoading}
              value={field.value}
              enterKeyHint={"next"}
              type={"name"}
              error={errors.userName?.message}
              placeholder={"Логин"}
            />
          )}
        />
        <Controller
          control={control}
          name={"password"}
          render={({ field }) => (
            <PasswordInput
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled || isLoading}
              value={field.value}
              error={errors.password?.message}
              enterKeyHint={"next"}
              placeholder={"Пароль"}
              autoComplete={"new-password"}
            />
          )}
        />
        <Controller
          control={control}
          name={"confirmPassword"}
          render={({ field }) => (
            <PasswordInput
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled || isLoading}
              value={field.value}
              error={errors.confirmPassword?.message}
              enterKeyHint={"next"}
              placeholder={"Подтвердите пароль"}
              autoComplete={"new-password"}
            />
          )}
        />
        <Controller
          control={control}
          name={"personalDataAccepted"}
          render={({ field }) => (
            <PersonalDataConsent
              name={field.name}
              checked={field.value}
              disabled={field.disabled || isLoading}
              error={errors.personalDataAccepted?.message}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onPolicyOpen={openPrivacyPolicy}
            />
          )}
        />
        <Button
          color={submitButtonColor}
          margin={"auto"}
          label={"Создать аккаунт"}
          type={"submit"}
          disabled={isSubmitDisabled}
        />
      </Box>
    </Form>
  );
};

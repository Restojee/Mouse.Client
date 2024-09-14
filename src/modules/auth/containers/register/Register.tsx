import { RegisterRequest } from "@/api/codegen/genMouseMapsApi";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useRegister } from "@/modules/auth/hooks/useRegister";
import { registerValidation } from "@/modules/auth/schemas/registerValidation";
import { StyledBox } from "@/ui/Box";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form/Form";
import { Input } from "@/ui/Input";
import { Typography } from "@/ui/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

export const Register = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterRequest & { confirmPassword: string }>({
    resolver: yupResolver(registerValidation),
    defaultValues: { inviteToken: router.query.invite as string },
  });

  const { register } = useRegister();
  const { theme } = useAppTheme();

  const onSubmit = async (data: RegisterRequest) => {
    await register(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledBox
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
              disabled={field.disabled}
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
            <Input
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              value={field.value}
              type={"password"}
              error={errors.password?.message}
              enterKeyHint={"next"}
              placeholder={"Пароль"}
            />
          )}
        />
        <Controller
          control={control}
          name={"confirmPassword"}
          render={({ field }) => (
            <Input
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              value={field.value}
              type={"password"}
              error={errors.confirmPassword?.message}
              enterKeyHint={"next"}
              placeholder={"Подтвердите пароль"}
            />
          )}
        />
        <Button
          color={theme.colors.brandColorContrastText}
          margin={"auto"}
          label={"Создать аккаунт"}
          type={"submit"}
        />
      </StyledBox>
    </Form>
  );
};

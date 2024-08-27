import { LoginRequest } from "@/api/codegen/genMouseMapsApi";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { useRegister } from "@/modules/auth/hooks/useRegister";
import { loginValidateSchema } from "@/modules/auth/schemas/loginValidateSchema";
import { StyledBox } from "@/ui/Box";
import { Button } from "@/ui/Button";
import { Divider } from "@/ui/Divider/Divider";
import { Form } from "@/ui/Form/Form";
import { Input } from "@/ui/Input";
import { Typography } from "@/ui/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

export const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginValidateSchema),
  });

  const { login } = useLogin();

  const { onRegisterModalOpen } = useRegister();

  const { theme } = useAppTheme();

  const onSubmit = async (data: LoginRequest) => {
    await login(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledBox
        direction={"column"}
        width={"100%"}
        gap={20}
      >
        <Typography
          fontSize={"1.5rem"}
          margin={"0 0 10px 0"}
        >
          Вход
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
              enterKeyHint={"send"}
              placeholder={"Пароль"}
            />
          )}
        />
        <Button
          margin={"auto"}
          color={theme.colors.brandColorContrastText}
          size={"lg"}
          label={"Войти"}
          type={"submit"}
        />
        <Divider />
        <StyledBox direction={"column"}>
          <Typography>Еще нет аккаунта?</Typography>
          <Typography
            onClick={onRegisterModalOpen}
            isLink
          >
            Регистрация
          </Typography>
        </StyledBox>
      </StyledBox>
    </Form>
  );
};

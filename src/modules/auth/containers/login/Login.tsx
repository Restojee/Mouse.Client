import { LoginRequest } from "@/api/codegen/genMouseMapsApi";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { loginValidateSchema } from "@/modules/auth/schemas/loginValidateSchema";
import { StyledBox } from "@/ui/Box";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form/Form";
import { Input } from "@/ui/Input";
import { Typography } from "@/ui/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Display } from "@/ui/Display";
import { Divider } from "@/ui/Divider/Divider";

export const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginValidateSchema),
  });

  const { login } = useLogin();
  const { theme } = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async (data: LoginRequest) => {
    await login(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledBox
        direction={"column"}
        width={"100%"}
        gap={30}
      >
        <Typography
          fontSize={"1.8rem"}
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
              size={46}
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
              size={46}
              error={errors.password?.message}
              enterKeyHint={"send"}
              placeholder={"Пароль"}
            />
          )}
        />

        <Button
          margin={"auto"}
          color={theme.colors.brandColorContrastText}
          label={"Войти"}
          type={"submit"}
          size={"lg"}
        />
        <Divider />
        <Typography
          margin={"-10px 0 0  0"}
          opacity={0.8}
          onClick={toggleOpen}
          isLink
        >
          Регистрация
        </Typography>
        <Display condition={isOpen}>
          <Typography
            fontSize={"0.8rem"}
            margin={"-10px 0 0 0"}
            opacity={0.5}
          >
            На данный момент регистрация возможна только по приглашению
          </Typography>
        </Display>
      </StyledBox>
    </Form>
  );
};

import React from "react";
import { Controller } from "react-hook-form";
import { Column } from "@/ui/Column";
import { Row } from "@/ui/Row";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form/Form";
import { Input, PasswordInput } from "@/ui/Input";
import { Typography } from "@/ui/Typography";
import { Display } from "@/ui/Display";
import { LogInIcon } from "@/svg/LogInIcon";
import loginStyles from "./Login.module.scss";
import { useLoginForm } from "./useLoginForm";

const textColor = "var(--color-text)";

export const Login = () => {
  const {
    control,
    errors,
    isLoading,
    isInviteHintOpen,
    onSubmit,
    onToggleInviteHint,
    onForgotPassword,
    onPrivacyPolicyOpen,
  } = useLoginForm();

  return (
    <Form onSubmit={onSubmit}>
      <Column className={loginStyles.login}>
        <Column className={loginStyles.header}>
          <div className={loginStyles.iconBadge}>
            <LogInIcon
              size={26}
              color="#ffffff"
            />
          </div>
          <Typography
            color={textColor}
            className={loginStyles.title}
          >
            С возвращением
          </Typography>
          <Typography
            color={textColor}
            className={loginStyles.subtitle}
          >
            Войдите в аккаунт, чтобы делиться своими прохождениями карт
          </Typography>
        </Column>

        <Column className={loginStyles.fields}>
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
              <PasswordInput
                name={field.name}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={field.disabled || isLoading}
                value={field.value}
                size={46}
                error={errors.password?.message}
                enterKeyHint={"send"}
                placeholder={"Пароль"}
                autoComplete={"current-password"}
              />
            )}
          />
          <Typography
            className={loginStyles.forgot}
            onClick={onForgotPassword}
          >
            Забыли пароль?
          </Typography>
        </Column>

        <Button
          label={"Войти"}
          type={"submit"}
          size={"lg"}
          fullWidth
          disabled={isLoading}
          isBold
        />

        <Row className={loginStyles.divider}>
          <div className={loginStyles.dividerLine} />
        </Row>

        <Row className={loginStyles.footer}>
          <Typography className={loginStyles.footerMuted}>Нет аккаунта?</Typography>
          <Typography
            className={loginStyles.registerLink}
            onClick={onToggleInviteHint}
          >
            Регистрация
          </Typography>
        </Row>
        <Display condition={isInviteHintOpen}>
          <Typography className={loginStyles.inviteHint}>
            На данный момент регистрация возможна только по приглашению
          </Typography>
        </Display>
        <Typography
          className={loginStyles.privacyLink}
          onClick={onPrivacyPolicyOpen}
        >
          Политика конфиденциальности
        </Typography>
      </Column>
    </Form>
  );
};

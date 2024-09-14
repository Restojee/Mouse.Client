import { inviteApi } from "@/api/inviteApi";
import { useAppNotifications } from "@/hooks/useAppNotifications";
import { useAppTheme } from "@/hooks/useAppTheme";
import { StyledDrawerHeader } from "@/layout/drawer/styled";
import { getInviteLink } from "@/modules/auth";
import { useUser } from "@/modules/user/hooks/useUser";
import { StyledBox } from "@/ui/Box";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Typography } from "@/ui/Typography";
import { UpdateAvatar } from "@/ui/UpdateAvatar/UpdateAvatar";
import { useCallback, useState } from "react";

export const Settings = () => {
  const { onError, onSuccess } = useAppNotifications();
  const { currentUser, updateUserImage } = useUser();
  const { theme } = useAppTheme();

  const [image, setImage] = useState(currentUser?.avatar);

  const onSubmitHandler = () => {
    if (image) {
      updateUserImage(image);
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
        <StyledBox gap={20}>
          <Input
            title={"Логин"}
            value={currentUser?.username}
            disabled
          />
          <Input
            title={"Пароль"}
            value={"пароль"}
            type={"password"}
            disabled
          />
        </StyledBox>
        <Button
          onClick={onSubmitHandler}
          label={"Сохранить"}
          color={theme.colors.brandColorContrastText}
        />
      </StyledBox>
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

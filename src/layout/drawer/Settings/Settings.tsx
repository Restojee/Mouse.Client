import { GetInviteCollectResponse } from "@/api/codegen/genMouseMapsApi";
import { inviteApi } from "@/api/inviteApi";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useEffect, useState } from "react";
import { StyledDrawerHeader } from "@/layout/drawer/styled";
import { useUser } from "@/modules/user/hooks/useUser";
import { StyledBox } from "@/ui/Box";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Typography } from "@/ui/Typography";
import { UpdateAvatar } from "@/ui/UpdateAvatar/UpdateAvatar";

export const Settings = () => {
  const [inviteToken, setInviteToken] = useState<GetInviteCollectResponse | null>(null);
  const { currentUser, updateUserImage } = useUser();
  const { theme } = useAppTheme();

  const [image, setImage] = useState(currentUser?.avatar);

  const onSubmitHandler = () => {
    if (image) {
      updateUserImage(image);
    }
  };

  useEffect(() => {
    inviteApi.getInviteToken().then(setInviteToken);
  }, [])

  return (
    <StyledBox
      direction="column"
      padding="0 20px 20px 20px"
      overflow={"auto"}
      grow={1}
    >
      <StyledDrawerHeader>
        <Typography>
          Настройки
        </Typography>
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
          <Input title={"Логин"} value={currentUser?.username} disabled/>
          <Input title={"Пароль"} value={"пароль"} type={"password"} disabled/>
        </StyledBox>
        <Button
          onClick={onSubmitHandler}
          label={"Сохранить"}
          color={theme.colors.brandColorContrastText}
        />
      </StyledBox>
      {/*<StyledBox align={"center"} direction={"column"} padding={"20px 0 0 0"} gap={20}>*/}
      {/*  <StyledDrawerHeader>*/}
      {/*    <Typography>*/}
      {/*      Другое*/}
      {/*    </Typography>*/}
      {/*  </StyledDrawerHeader>*/}
      {/*  <Input title={"Пригласительный код"} value={inviteToken?.token} readOnly/>*/}
      {/*  <Button*/}
      {/*    label={"Копировать код"}*/}
      {/*    color={theme.colors.brandColorContrastText}*/}
      {/*  />*/}
      {/*</StyledBox>*/}
    </StyledBox>
  );
};


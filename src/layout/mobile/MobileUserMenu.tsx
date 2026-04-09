import * as React from "react";
import styled from "styled-components";
import { getAvatarImageLink } from "@/common/utils";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemeKey } from "@/layout/theme/types";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { selectCurrentUser, selectIsAuth } from "@/modules/auth/slice";
import { TabsType } from "@/layout/panel/Panel";
import { ChartIcon } from "@/svg/ChartIcon";
import { LogInIcon } from "@/svg/LogInIcon";
import { MoonIcon } from "@/svg/MoonIcon";
import { OutIcon } from "@/svg/OutIcon";
import { SettingsIcon } from "@/svg/SettingsIcon";
import { SunIcon } from "@/svg/SunIcon";
import { Avatar } from "@/ui/Avatar";
import { Display } from "@/ui/Display";
import { useMemo } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onOpenTab: (tab: TabsType) => void;
};

const Overlay = styled.div<{ isOpen: boolean }>(({ isOpen }) => ({
  position: "fixed",
  inset: 0,
  zIndex: 300,
  pointerEvents: isOpen ? "auto" : "none",
}));

const Backdrop = styled.div<{ isOpen: boolean }>(({ isOpen }) => ({
  position: "absolute",
  inset: 0,
  opacity: isOpen ? 1 : 0,
  transition: "opacity 0.3s",
}));

const Menu = styled.div<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  position: "absolute",
  bottom: "calc(50px + 8px)",
  right: 8,
  width: "240px",
  backgroundColor: theme.colors.secondary,
  border: `1px solid ${theme.colors.input.border}`,
  borderRadius: theme.blockSettings.siteBorder,
  display: "flex",
  flexDirection: "column",
  padding: "4px 0",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  transform: isOpen ? "scale(1)" : "scale(0.9)",
  transformOrigin: "bottom right",
  opacity: isOpen ? 1 : 0,
  transition: "transform 0.2s, opacity 0.2s",
  pointerEvents: isOpen ? "auto" : "none",
}));

const UserRow = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "8px 14px",
  color: theme.colors.textOnSecondary,
  fontSize: 14,
  fontWeight: 600,
  borderBottom: `1px solid ${theme.colors.input.border}`,
  marginBottom: 4,
}));

const MenuItem = styled.div<{ isDanger?: boolean }>(({ theme, isDanger }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "8px 14px",
  fontSize: "0.9rem",
  cursor: "pointer",
  color: isDanger ? theme.colors.status.error : theme.colors.textOnSecondary,
  transition: "background-color 0.1s",
  "&:hover": {
    backgroundColor: theme.colors.default.paperAccent,
  },
}));

const MenuDivider = styled.div(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.input.border,
  margin: "4px 0",
}));

export const MobileUserMenu: React.FC<Props> = ({ isOpen, onClose, onOpenTab }) => {
  const { onLoginModalOpen, logout } = useLogin();
  const { toggleTheme, themeKey, theme } = useAppTheme();
  const isAuth = useAppSelector(selectIsAuth);
  const userData = useAppSelector(selectCurrentUser);

  const iconColor = theme.colors.textOnSecondary;

  const themeIcon = useMemo(
    () => (themeKey === ThemeKey.LIGHT ? <MoonIcon color={iconColor} /> : <SunIcon color={iconColor} />),
    [themeKey, iconColor],
  );
  const themeLabel = themeKey === ThemeKey.LIGHT ? "Тёмная тема" : "Светлая тема";

  const handleTabClick = (tab: TabsType) => {
    onOpenTab(tab);
    onClose();
  };

  return (
    <Overlay isOpen={isOpen}>
      <Backdrop
        isOpen={isOpen}
        onClick={onClose}
      />
      <Menu isOpen={isOpen}>
        <Display condition={isAuth}>
          <UserRow>
            <Avatar
              size={30}
              image={getAvatarImageLink(userData?.avatar)}
              username={userData?.username}
            />
            {userData?.username}
          </UserRow>
        </Display>

        <MenuItem onClick={() => handleTabClick("statistic")}>
          <ChartIcon color={iconColor} />
          Статистика
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (isAuth) handleTabClick("settings");
          }}
          style={{ opacity: isAuth ? 1 : 0.4, pointerEvents: isAuth ? "auto" : "none" }}
        >
          <SettingsIcon color={iconColor} />
          Настройки
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            toggleTheme();
            onClose();
          }}
        >
          {themeIcon}
          {themeLabel}
        </MenuItem>
        <Display condition={isAuth}>
          <MenuItem
            isDanger
            onClick={() => {
              logout();
              onClose();
            }}
          >
            <OutIcon color={"#ce5252"} />
            Выйти
          </MenuItem>
        </Display>
        <Display condition={!isAuth}>
          <MenuItem
            onClick={() => {
              onLoginModalOpen();
              onClose();
            }}
          >
            <LogInIcon color={iconColor} />
            Войти
          </MenuItem>
        </Display>
      </Menu>
    </Overlay>
  );
};

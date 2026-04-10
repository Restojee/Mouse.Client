import * as React from "react";
import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { NavLink } from "@/layout/navigation/NavLink";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { TabsType } from "@/layout/panel/Panel";
import { BurgerIcon } from "@/svg/BurgerIcon";
import { ChatFillIcon } from "@/svg/ChatFillIcon";
import { NotificationsIcon } from "@/svg/NotificationIcon";
import { PaperIcon } from "@/svg/PaperIcon";
import { ChartIcon } from "@/svg/ChartIcon";
import { LogInIcon } from "@/svg/LogInIcon";
import { MoonIcon } from "@/svg/MoonIcon";
import { OutIcon } from "@/svg/OutIcon";
import { SettingsIcon } from "@/svg/SettingsIcon";
import { SunIcon } from "@/svg/SunIcon";
import { MobileNavDrawer } from "@/layout/mobile/MobileNavDrawer";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser, selectIsAuth } from "@/modules/auth/slice";
import { useNotifications } from "@/modules/notifications";
import { useChat } from "@/modules/chat/hooks/useChat";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { ThemeKey } from "@/layout/theme/types";
import { ContextMenu } from "@/ui/ContextMenu";
import { StyledContextMenuUserRow } from "@/ui/ContextMenu/styled";
import type { ListItemOptions } from "@/ui/ContextMenu/ContextMenuItem";
import { AnchorAlign, PopupPosition } from "@/ui/Popup";
import { Avatar } from "@/ui/Avatar";
import { getAvatarImageLink } from "@/common/utils";

type Props = {
  activeTab: TabsType;
  isOpen: boolean;
  setActiveTab: (tab: TabsType) => void;
  setIsOpen: (isOpen: boolean) => void;
};

const Bar = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  width: "100%",
  height: "50px",
  minHeight: "50px",
  backgroundColor: theme.colors.primary,
  padding: "0 16px",
}));

const DotsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="5"
      cy="12"
      r="2"
      fill="#CCD2E3"
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      fill="#CCD2E3"
    />
    <circle
      cx="19"
      cy="12"
      r="2"
      fill="#CCD2E3"
    />
  </svg>
);

export const MobilePanel: React.FC<Props> = ({ activeTab, isOpen, setActiveTab, setIsOpen }) => {
  const [navOpen, setNavOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const isAuth = useAppSelector(selectIsAuth);
  const userData = useAppSelector(selectCurrentUser);
  const { isHasNewNotifications } = useNotifications();
  const { isHasNewMessage } = useChat();
  const { toggleTheme, themeKey, theme } = useAppTheme();
  const { onLoginModalOpen, logout } = useLogin();

  const iconColor = theme.colors.textOnSecondary;

  const onTabClick = (tab: TabsType) => {
    setActiveTab(tab);
    if (activeTab === tab && isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
    setUserMenuOpen(false);
  };

  const onOpenTab = useCallback(
    (tab: TabsType) => {
      setActiveTab(tab);
      setIsOpen(true);
    },
    [setActiveTab, setIsOpen],
  );

  const menuItems = useMemo((): ListItemOptions[] => {
    const items: ListItemOptions[] = [
      {
        id: "stat",
        label: "Статистика",
        icon: <ChartIcon color={iconColor} />,
      },
      {
        id: "settings",
        label: "Настройки",
        icon: <SettingsIcon color={iconColor} />,
        disabled: !isAuth,
      },
      {
        id: "theme",
        label: themeKey === ThemeKey.LIGHT ? "Тёмная тема" : "Светлая тема",
        icon: themeKey === ThemeKey.LIGHT ? <MoonIcon color={iconColor} /> : <SunIcon color={iconColor} />,
        divider: true,
      },
    ];

    if (isAuth) {
      items.push({
        id: "logout",
        label: "Выйти",
        icon: <OutIcon color={theme.colors.status.error} />,
        isDanger: true,
      });
    } else {
      items.push({
        id: "login",
        label: "Войти",
        icon: <LogInIcon color={iconColor} />,
      });
    }

    return items;
  }, [isAuth, themeKey, iconColor, theme.colors.status.error]);

  const handleMenuChange = useCallback(
    (item: ListItemOptions) => {
      switch (item.id) {
        case "stat":
          onOpenTab("statistic");
          break;
        case "settings":
          onOpenTab("settings");
          break;
        case "theme":
          toggleTheme();
          break;
        case "logout":
          logout();
          break;
        case "login":
          onLoginModalOpen();
          break;
      }
    },
    [onOpenTab, toggleTheme, logout, onLoginModalOpen],
  );

  return (
    <>
      <MobileNavDrawer
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
      />
      <Bar>
        <NavLink
          onClick={() => setNavOpen(true)}
          prepend={
            <StyledNavLinkSection>
              <BurgerIcon />
            </StyledNavLinkSection>
          }
        />
        <NavLink
          hasPin={Boolean(isHasNewNotifications)}
          isChecked={activeTab === "notifications" && isOpen}
          onClick={() => onTabClick("notifications")}
          prepend={
            <StyledNavLinkSection>
              <NotificationsIcon />
            </StyledNavLinkSection>
          }
        />
        <NavLink
          hasPin={Boolean(isHasNewMessage && isAuth)}
          isDisabled={!isAuth}
          isChecked={activeTab === "chat" && isOpen}
          onClick={() => onTabClick("chat")}
          prepend={
            <StyledNavLinkSection>
              <ChatFillIcon />
            </StyledNavLinkSection>
          }
        />
        <NavLink
          isChecked={activeTab === "info" && isOpen}
          onClick={() => onTabClick("info")}
          prepend={
            <StyledNavLinkSection>
              <PaperIcon />
            </StyledNavLinkSection>
          }
        />
        <ContextMenu
          items={menuItems}
          anchor={
            <NavLink
              onClick={() => {
                setUserMenuOpen((v) => !v);
                if (isOpen) setIsOpen(false);
              }}
              prepend={
                <StyledNavLinkSection>
                  <DotsIcon />
                </StyledNavLinkSection>
              }
            />
          }
          isOpen={userMenuOpen}
          onClose={() => setUserMenuOpen(false)}
          onChange={handleMenuChange}
          position={PopupPosition.TOP}
          anchorAlign={AnchorAlign.END}
          header={
            isAuth && userData ? (
              <StyledContextMenuUserRow>
                <Avatar
                  size={30}
                  image={getAvatarImageLink(userData.avatar)}
                  username={userData.username}
                />
                {userData.username}
              </StyledContextMenuUserRow>
            ) : undefined
          }
          minWidth={220}
          transformOrigin="bottom right"
          offset={30}
        />
      </Bar>
    </>
  );
};

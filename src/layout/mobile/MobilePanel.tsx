import * as React from "react";
import { useCallback, useMemo, useRef } from "react";
import { Drawer } from "@/layout/drawer/Drawer";
import { NavLink } from "@/layout/navigation/NavLink";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { TabsType } from "@/layout/panel/Panel";
import { BurgerIcon } from "@/svg/BurgerIcon";
import { ChatFillIcon } from "@/svg/ChatFillIcon";
import { NotificationsIcon } from "@/svg/NotificationIcon";
import { PaperIcon } from "@/svg/PaperIcon";
import { AddRoundIcon } from "@/svg/AddRoundIcon";
import { ChartIcon } from "@/svg/ChartIcon";
import { LogInIcon } from "@/svg/LogInIcon";
import { MoonIcon } from "@/svg/MoonIcon";
import { OutIcon } from "@/svg/OutIcon";
import { SettingsIcon } from "@/svg/SettingsIcon";
import { SunIcon } from "@/svg/SunIcon";
import { MobileNavDrawerContent } from "@/layout/mobile/MobileNavDrawer";
import type { SheetHandle } from "@/ui/Sheet";
import { useSheet } from "@/ui/Sheet";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser, selectIsAuth } from "@/modules/auth/slice";
import { useNotifications } from "@/modules/notifications";
import { useChat } from "@/modules/chat/hooks/useChat";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { ThemeKey } from "@/layout/theme/types";
import { ContextMenu } from "@/ui/ContextMenu";
import contextMenuStyles from "@/ui/ContextMenu/ContextMenu.module.scss";
import type { ListItemOptions } from "@/ui/ContextMenu/ContextMenuItem";
import { AnchorAlign, PopupPosition } from "@/ui/Popup";
import { Avatar } from "@/ui/Avatar";
import { getAvatarImageLink } from "@/common/utils";
import styles from "./MobilePanel.module.scss";

const NAV_ICON_COLOR = "#CCD2E3";

type Props = {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
};

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
      fill={NAV_ICON_COLOR}
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      fill={NAV_ICON_COLOR}
    />
    <circle
      cx="19"
      cy="12"
      r="2"
      fill={NAV_ICON_COLOR}
    />
  </svg>
);

export const MobilePanel: React.FC<Props> = ({ createOpen, setCreateOpen }) => {
  const sheet = useSheet();
  const [activeTab, setActiveTab] = React.useState<TabsType | null>(null);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const drawerHandleRef = useRef<SheetHandle | null>(null);

  const isAuth = useAppSelector(selectIsAuth);
  const userData = useAppSelector(selectCurrentUser);
  const { isHasNewNotifications } = useNotifications();
  const { isHasNewMessage } = useChat();
  const { toggleTheme, themeKey, theme } = useAppTheme();
  const { onLoginModalOpen, logout } = useLogin();

  const iconColor = theme.colors.textOnSecondary;

  const openDrawer = useCallback(
    (tab: TabsType) => {
      // Если тот же tab — закрываем
      if (activeTab === tab && drawerHandleRef.current) {
        drawerHandleRef.current.close();
        drawerHandleRef.current = null;
        setActiveTab(null);
        return;
      }

      // Закрываем предыдущий если был
      if (drawerHandleRef.current) {
        drawerHandleRef.current.close();
      }

      setActiveTab(tab);
      drawerHandleRef.current = sheet.show(
        <Drawer
          isOpen
          activeTab={tab}
        />,
        {
          noHeader: true,
          height: "85dvh",
          withoutButtons: true,
          withoutTitle: true,
          onClose: () => {
            drawerHandleRef.current = null;
            setActiveTab(null);
          },
        },
      );
    },
    [sheet, activeTab],
  );

  const openNavDrawer = useCallback(() => {
    sheet.show(<MobileNavDrawerContent />, {
      noHeader: true,
      height: "85dvh",
      withoutButtons: true,
      withoutTitle: true,
      themeKey: ThemeKey.DARK,
    });
  }, [sheet]);

  const menuItems = useMemo((): ListItemOptions[] => {
    const items: ListItemOptions[] = [
      { id: "info", label: "Полезная инфа", icon: <PaperIcon color={iconColor} /> },
      { id: "stat", label: "Статистика", icon: <ChartIcon color={iconColor} /> },
      { id: "settings", label: "Настройки", icon: <SettingsIcon color={iconColor} />, disabled: !isAuth },
      {
        id: "theme",
        label: themeKey === ThemeKey.LIGHT ? "Тёмная тема" : "Светлая тема",
        icon: themeKey === ThemeKey.LIGHT ? <MoonIcon color={iconColor} /> : <SunIcon color={iconColor} />,
        divider: true,
      },
    ];

    if (isAuth) {
      items.push({ id: "logout", label: "Выйти", icon: <OutIcon color={theme.colors.status.error} />, isDanger: true });
    } else {
      items.push({ id: "login", label: "Войти", icon: <LogInIcon color={iconColor} /> });
    }

    return items;
  }, [isAuth, themeKey, iconColor, theme.colors.status.error]);

  const handleMenuChange = useCallback(
    (item: ListItemOptions) => {
      switch (item.id) {
        case "info":
          openDrawer("info");
          break;
        case "stat":
          openDrawer("statistic");
          break;
        case "settings":
          openDrawer("settings");
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
    [openDrawer, toggleTheme, logout, onLoginModalOpen],
  );

  const isDrawerOpen = activeTab !== null;

  return (
    <div className={styles.bar}>
      <NavLink
        onClick={openNavDrawer}
        prepend={
          <StyledNavLinkSection>
            <BurgerIcon />
          </StyledNavLinkSection>
        }
      />
      <NavLink
        hasPin={Boolean(isHasNewNotifications)}
        isChecked={activeTab === "notifications"}
        onClick={() => openDrawer("notifications")}
        prepend={
          <StyledNavLinkSection>
            <NotificationsIcon color={NAV_ICON_COLOR} />
          </StyledNavLinkSection>
        }
      />
      <NavLink
        hasPin={Boolean(isHasNewMessage && isAuth)}
        isDisabled={!isAuth}
        isChecked={activeTab === "chat"}
        onClick={() => openDrawer("chat")}
        prepend={
          <StyledNavLinkSection>
            <ChatFillIcon color={NAV_ICON_COLOR} />
          </StyledNavLinkSection>
        }
      />
      <NavLink
        isDisabled={!isAuth}
        isChecked={createOpen}
        onClick={() => {
          setCreateOpen(!createOpen);
          setUserMenuOpen(false);
        }}
        prepend={
          <StyledNavLinkSection>
            <AddRoundIcon color={NAV_ICON_COLOR} />
          </StyledNavLinkSection>
        }
      />
      <ContextMenu
        items={menuItems}
        anchor={
          <NavLink
            onClick={() => {
              setUserMenuOpen((v) => !v);
              if (isDrawerOpen && drawerHandleRef.current) {
                drawerHandleRef.current.close();
                drawerHandleRef.current = null;
                setActiveTab(null);
              }
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
            <div className={contextMenuStyles.userRow}>
              <Avatar
                size={30}
                image={getAvatarImageLink(userData.avatar)}
                username={userData.username}
              />
              {userData.username}
            </div>
          ) : undefined
        }
        minWidth={220}
        transformOrigin="bottom right"
        offset={30}
      />
    </div>
  );
};

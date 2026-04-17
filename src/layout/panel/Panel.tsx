import { getAvatarImageLink } from "@/common/utils";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { NavLink } from "@/layout/navigation/NavLink";
import { NavLinkSection } from "@/layout/navigation/styles/NavLinkSection";
import panelStyles from "@/layout/panel/Panel.module.scss";
import { ThemeKey } from "@/layout/theme/types";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { selectCurrentUser, selectIsAuth } from "@/modules/auth/slice";
import { useChat } from "@/modules/chat/hooks/useChat";
import { BurgerIcon } from "@/svg/BurgerIcon";
import { ChartIcon } from "@/svg/ChartIcon";
import { ChatFillIcon } from "@/svg/ChatFillIcon";
import { LogInIcon } from "@/svg/LogInIcon";
import { MoonIcon } from "@/svg/MoonIcon";
import { NotificationsIcon } from "@/svg/NotificationIcon";
import { OutIcon } from "@/svg/OutIcon";
import { PaperIcon } from "@/svg/PaperIcon";
import { SettingsIcon } from "@/svg/SettingsIcon";
import { SunIcon } from "@/svg/SunIcon";
import { Avatar } from "@/ui/Avatar";
import { Display } from "@/ui/Display";
import { Property } from "csstype";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useNotifications } from "@/modules/notifications";

export type PanelProps = {
  activeTab: string;
  setActiveTab: (tab: TabsType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export type TabsType = "settings" | "notifications" | "info" | "statistic" | "chat";
export const Panel = (props: PanelProps) => {
  const { onLoginModalOpen, logout } = useLogin();

  const { toggleTheme, themeKey } = useAppTheme();

  const { isHasNewMessage } = useChat();
  const { isHasNewNotifications } = useNotifications();

  const isAuth = useAppSelector(selectIsAuth);
  const userData = useAppSelector(selectCurrentUser);

  const themeIcon = useMemo(() => {
    return themeKey === ThemeKey.LIGHT ? <MoonIcon /> : <SunIcon />;
  }, [themeKey]);

  const pins: Partial<Record<TabsType, boolean>> = useMemo(() => {
    return {
      chat: Boolean(isHasNewMessage && isAuth),
      notifications: Boolean(isHasNewNotifications && isAuth),
    };
  }, [isHasNewMessage, isHasNewNotifications, isAuth]);

  const onTabClickHandler = (tab: TabsType | null) => {
    if (!tab) {
      alert("Пока не работает");
      return;
    }
    props.setActiveTab(tab);
    props.setIsOpen(true);

    if (props.activeTab === tab && props.isOpen) {
      props.setIsOpen(false);
    }
  };

  const avatar = userData?.avatar;

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number; opacity: number }>({
    top: 0,
    height: 0,
    opacity: 0,
  });

  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;
    const activeIndex = tabsData.findIndex((el) => el.tab === props.activeTab);
    if (activeIndex === -1 || !props.isOpen) {
      setIndicatorStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const el = container.children[activeIndex + 1] as HTMLElement;
    if (!el) return;
    setIndicatorStyle({ top: el.offsetTop, height: el.offsetHeight, opacity: 1 });
  }, [props.activeTab, props.isOpen]);

  return (
    <div className={panelStyles.panel}>
      <NavLink
        onClick={() => props.setIsOpen(!props.isOpen)}
        prepend={
          <NavLinkSection>
            <BurgerIcon />
          </NavLinkSection>
        }
      />
      <Display condition={isAuth}>
        <Avatar
          size={40}
          image={getAvatarImageLink(avatar, "display")}
          username={userData?.username}
        />
      </Display>

      <div
        className={panelStyles.tabsGroup}
        ref={tabsContainerRef}
      >
        <div
          className={panelStyles.tabSlideIndicator}
          style={indicatorStyle}
        />
        {tabsData.map((el, index) => (
          <NavLink
            key={index}
            hasPin={Boolean(el.tab && pins[el.tab])}
            isDisabled={(el.isNeedAuth && !isAuth) || !el.tab}
            label={el.label}
            description={el.label}
            isChecked={el.tab === props.activeTab && props.isOpen}
            onClick={() => onTabClickHandler(el.tab)}
            margin={el.margin}
            border={el.border}
            gap="0"
            justifyContent="center"
            prepend={<NavLinkSection>{el.icon}</NavLinkSection>}
          />
        ))}
      </div>
      <NavLink
        onClick={toggleTheme}
        border
        label="Сменить тему"
        prepend={<NavLinkSection>{themeIcon}</NavLinkSection>}
      />
      <Display condition={isAuth}>
        <NavLink
          label={"Выйти"}
          onClick={logout}
          prepend={
            <NavLinkSection>
              <OutIcon color={"#e87575"} />
            </NavLinkSection>
          }
        />
      </Display>
      <Display condition={!isAuth}>
        <NavLink
          label={"Войти"}
          onClick={onLoginModalOpen}
          prepend={
            <NavLinkSection>
              <LogInIcon />
            </NavLinkSection>
          }
        />
      </Display>
    </div>
  );
};

export const tabsData: TabsDataType[] = [
  {
    label: "Уведомления",
    // isNeedAuth: true,
    tab: "notifications",
    border: true,
    icon: <NotificationsIcon />,
  },
  {
    label: "Полезная инфа",
    tab: "info",
    isNeedAuth: true,
    icon: <PaperIcon color="white" />,
  },
  {
    label: "Статистика",
    tab: "statistic",
    icon: <ChartIcon />,
  },
  {
    label: "Чат",
    isNeedAuth: true,
    tab: "chat",
    icon: <ChatFillIcon />,
  },
  {
    label: "Настройки",
    isNeedAuth: true,
    tab: "settings",
    icon: <SettingsIcon />,
    margin: "auto 0 0 0",
  },
];

type TabsDataType = {
  label: string;
  tab: TabsType | null;
  isNeedAuth?: boolean;
  icon: ReactNode;
  border?: boolean;
  margin?: Property.Margin;
};

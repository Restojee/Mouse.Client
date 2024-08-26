import { getAvatarImageLink } from "@/common/utils";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { NavLink } from "@/layout/navigation/NavLink";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { StyledPanel } from "@/layout/panel/styled";
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
import { ReactNode, useEffect, useMemo } from "react";

export type PanelProps = {
    activeTab: string;
    setActiveTab: (tab: TabsType) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
export type TabsType = 'settings' | 'notifications' | 'info' | 'statistic' | 'chat'
export const Panel = (props: PanelProps) => {
    const {
        onLoginModalOpen,
        logout
    } = useLogin();

    const { toggleTheme, themeKey } = useAppTheme();

    const { isHasNewMessage, fetchChatMessages, messages } = useChat();

    const isAuth = useAppSelector(selectIsAuth);
    const userData = useAppSelector(selectCurrentUser);

    const themeIcon = useMemo(() => {
      return themeKey === ThemeKey.LIGHT ? <MoonIcon/> : <SunIcon/>
    }, [themeKey])

    const onTabClickHandler = (tab: TabsType | null) => {
        if (!tab) {
            alert('Пока не работает');
            return;
        }
        props.setActiveTab(tab);
        props.setIsOpen(true);
        if (props.activeTab === tab && props.isOpen) props.setIsOpen(false);
    };

    const avatar = userData?.avatar;

    useEffect(() => {
      if (!messages?.length) {
        fetchChatMessages();
      }

      const id = setInterval(() => {
        fetchChatMessages();
      }, 5000);
      return () => {
        clearInterval(id);
      };
    }, [])

    return (
        <StyledPanel>
            <NavLink
                isDisabled={!isAuth}
                onClick={() => props.setIsOpen(!props.isOpen)}
                prepend={
                    <StyledNavLinkSection>
                        <BurgerIcon/>
                    </StyledNavLinkSection>
                }
            />
            <Display condition={isAuth}>
              <Avatar
                size={40}
                image={getAvatarImageLink(avatar)}
                username={userData?.username}
              />
            </Display>

            {tabsData.map((el, index) => (
                <NavLink
                    key={index}
                    hasPin={Boolean(el.tab === "chat" && isHasNewMessage && isAuth)}
                    isDisabled={(el.isNeedAuth && !isAuth) || !el.tab}
                    label={el.label}
                    description={el.label}
                    isChecked={el.tab === props.activeTab}
                    onClick={() => onTabClickHandler(el.tab)}
                    margin={el.margin}
                    border={el.border}
                    prepend={(
                        <StyledNavLinkSection>
                            {el.icon}
                        </StyledNavLinkSection>
                    )}
                />
            ))}
            <NavLink
                onClick={toggleTheme}
                border
                label="Сменить тему"
                prepend={(
                    <StyledNavLinkSection>
                      {themeIcon}
                    </StyledNavLinkSection>
                )}
            />
            <Display condition={isAuth}>
                <NavLink
                    label={'Выйти'}
                    onClick={logout}
                    prepend={(
                        <StyledNavLinkSection>
                            <OutIcon color={'#e87575'}/>
                        </StyledNavLinkSection>
                    )}
                />
            </Display>
            <Display condition={!isAuth}>
                <NavLink
                    label={'Войти'}
                    onClick={onLoginModalOpen}
                    prepend={(
                        <StyledNavLinkSection>
                            <LogInIcon/>
                        </StyledNavLinkSection>
                    )}
                />
            </Display>
        </StyledPanel>
    );
};

export const tabsData: TabsDataType[] = [
    {
        label: 'Уведомления',
        isNeedAuth: true,
        tab: null,
        border: true,
        icon: <NotificationsIcon/>,
    },
    {
        label: 'Полезная инфа',
        tab: 'info',
        isNeedAuth: true,
        icon: <PaperIcon/>,
    },
    {
        label: 'Статистика',
        tab: 'statistic',
        icon: <ChartIcon/>,
    },
    {
        label: 'Чат',
        isNeedAuth: true,
        tab: 'chat',
        icon: <ChatFillIcon/>,
    },
    {
        label: 'Настройки',
        isNeedAuth: true,
        tab: 'settings',
        icon: <SettingsIcon/>,
        margin: 'auto 0 0 0',
    },
];

type TabsDataType = {
    label: string,
    tab: TabsType | null,
    isNeedAuth?: boolean,
    icon: ReactNode,
    border?: boolean,
    margin?: Property.Margin
}

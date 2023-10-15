import { DEFAULT_USER_IMAGE } from '@/common/contants';
import { useAppSelector } from '@/hooks/useAppSelector';
import { NavLink } from "@/layout/navigation/NavLink";
import { selectCurrentUser, selectIsAuth } from '@/modules/auth/slice';
import { MoonIcon } from "@/svg/MoonIcon";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { BurgerIcon } from "@/svg/BurgerIcon";
import { NotificationsIcon } from "@/svg/NotificationIcons";
import { ChartIcon } from "@/svg/ChartIcon";
import { OutIcon } from '@/svg/OutIcon';
import { PaperIcon } from "@/svg/PaperIcon";
import { ChatFillIcon } from "@/svg/ChatFillIcon";
import { SettingsIcon } from "@/svg/SettingsIcon";
import { LogInIcon } from "@/svg/LogInIcon";
import { Avatar } from '@/ui/Avatar';
import { Display } from '@/ui/Display';
import { ReactNode } from "react";
import { Property } from "csstype";
import { StyledPanel } from "@/layout/panel/styled";
import {
    signIn,
    signOut,
} from "next-auth/react"

export type PanelProps = {
    activeTab: string;
    setActiveTab: (tab: TabsType) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
export type TabsType = 'settings' | 'notifications' | 'info' | 'statistic' | 'chat'
export const Panel = (props: PanelProps) => {

    const isAuth = useAppSelector(selectIsAuth);
    const userData = useAppSelector(selectCurrentUser);

    const onTabClickHandler = (tab: TabsType) => {
        props.setActiveTab(tab)
        props.setIsOpen(true)
        if(props.activeTab === tab && props.isOpen) props.setIsOpen(false)
    }

    const avatar = userData?.avatar || DEFAULT_USER_IMAGE

    return (
        <StyledPanel>
            <NavLink
                isDisabled={!isAuth}
                onClick={() => props.setIsOpen(!props.isOpen)}
                prepend={
                    <StyledNavLinkSection>
                        <BurgerIcon />
                    </StyledNavLinkSection>
                }
            />
            <Avatar size={46} image={avatar} />
            { tabsData.map(el => (
                <NavLink
                    key={ el.tab }
                    isDisabled={el.isNeedAuth && !isAuth}
                    label={ el.label }
                    isChecked={ el.tab === props.activeTab }
                    onClick={ () => onTabClickHandler(el.tab) }
                    margin={ el.margin }
                    border={ el.border }
                    prepend={ (
                        <StyledNavLinkSection>
                            {el.icon}
                        </StyledNavLinkSection>
                    ) }
                />
            )) }
            <NavLink
                border
                label="Сменить тему"
                prepend={(
                    <StyledNavLinkSection>
                        <MoonIcon />
                    </StyledNavLinkSection>
                )}
            />
            <Display condition={isAuth}>
                <NavLink
                    label={"Выйти"}
                    onClick={ signOut }
                    prepend={(
                        <StyledNavLinkSection>
                            <OutIcon color={'#e87575'}/>
                        </StyledNavLinkSection>
                    )}
                />
            </Display>
            <Display condition={!isAuth}>
                <NavLink
                    label={"Войти"}
                    onClick={ () => signIn("mouse-auth") }
                    prepend={(
                        <StyledNavLinkSection>
                            <LogInIcon />
                        </StyledNavLinkSection>
                    )}
                />
            </Display>
        </StyledPanel>
    )
}

export const tabsData: TabsDataType[] = [
    {label: "Уведомления", isNeedAuth: true, tab: 'notifications', border: true, icon: <NotificationsIcon />},
    {label: "Полезная инфа", isNeedAuth: true, tab: 'info', icon: <PaperIcon />},
    {label: "Статистика", isNeedAuth: true, tab: 'statistic', icon: <ChartIcon />},
    {label: "Чат", isNeedAuth: true, tab: 'chat', icon: <ChatFillIcon />},
    {label: "Настройки", isNeedAuth: true, tab: 'settings', icon: <SettingsIcon />, margin: "auto 0 0 0"}

]

type TabsDataType = {
    label: string,
    tab: TabsType,
    isNeedAuth?: boolean,
    icon: ReactNode,
    border?: boolean,
    margin?: Property.Margin
}
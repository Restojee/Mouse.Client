import { Avatar } from "@/layout/avatar/Avatar";
import { NavLink } from "@/layout/navigation/NavLink";
import { MoonIcon } from "@/svg/MoonIcon";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { BurgerIcon } from "@/svg/BurgerIcon";
import { NotificationsIcon } from "@/svg/NotificationIcons";
import { ChartIcon } from "@/svg/ChartIcon";
import { PaperIcon } from "@/svg/PaperIcon";
import { ChatFillIcon } from "@/svg/ChatFillIcon";
import { SettingsIcon } from "@/svg/SettingsIcon";
import { LogInIcon } from "@/svg/LogInIcon";
import { ReactNode } from "react";
import { Property } from "csstype";
import { StyledPanel } from "@/layout/panel/styled";
import {
    signIn,
    signOut,
    useSession
} from "next-auth/react"

export type PanelProps = {
    activeTab: string;
    setActiveTab: (tab: TabsType) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
export type TabsType = 'settings' | 'notifications' | 'info' | 'statistic' | 'chat'
export const Panel = (props: PanelProps) => {

    const onTabClickHandler = (tab: TabsType) => {
        props.setActiveTab(tab)
        props.setIsOpen(true)
        if(props.activeTab === tab && props.isOpen) props.setIsOpen(false)
    }

    const avatar = "https://i.imgur.com/P11sXfz.png"

    return (
        <StyledPanel>
            <NavLink
                onClick={() => props.setIsOpen(!props.isOpen)}
                prepend={
                    <StyledNavLinkSection>
                        <BurgerIcon />
                    </StyledNavLinkSection>
                }
            />
            <Avatar size="46px" image={avatar} />
            { tabsData.map(el => (
                <NavLink
                    key={ el.tab }
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
            <NavLink
                label="Выйти/войти"
                onClick={ () => signIn("mouse-auth") }
                prepend={(
                    <StyledNavLinkSection>
                        <LogInIcon />
                    </StyledNavLinkSection>
                )}
            />
        </StyledPanel>
    )
}

export const tabsData: TabsDataType[] = [
    {label: "Уведомления", tab: 'notifications', border: true, icon: <NotificationsIcon />},
    {label: "Полезная инфа", tab: 'info', icon: <PaperIcon />},
    {label: "Статистика", tab: 'statistic', icon: <ChartIcon />},
    {label: "Чат", tab: 'chat', icon: <ChatFillIcon />},
    {label: "Настройки", tab: 'settings', icon: <SettingsIcon />, margin: "auto 0 0 0"}

]

type TabsDataType = {
    label: string,
    tab: TabsType,
    icon: ReactNode,
    border?: boolean,
    margin?: Property.Margin
}
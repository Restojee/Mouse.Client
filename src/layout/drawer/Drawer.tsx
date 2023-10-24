import { Chat } from '@/layout/drawer/Chat/Chat';
import {ReactNode} from "react";
import {TabsType} from "@/layout/panel/Panel";
import {Notifications} from "@/layout/drawer/Notifications/Notifications";
import {Info} from "@/layout/drawer/Info/Info";
import { Statistic } from "@/layout/drawer/Statistic/Statistic";
import { StyledDrawer } from "@/layout/drawer/styled";

type Props = {
    activeTab: TabsType,
    isOpen: boolean
}
export const Drawer = (props: Props) => {
    return (
        <StyledDrawer isOpen={props.isOpen}>
            {getTabsContent(props.activeTab)}
        </StyledDrawer>
    )
}

const getTabsContent = (tab: TabsType): ReactNode => {
    const tabs: TabsContentType[] = [
        {
            component: <Notifications />,
            tab: '',
        },
        {
            component: <Info />,
            tab: '',
        },
        {
            component: <Statistic />,
            tab: 'statistic',
        },
        {
            component: <Chat/>,
            tab: 'chat',
        },
        {
            component: <>Настройки</>,
            tab: '',
        }
    ]

    return tabs.find(el => el.tab === tab)?.component
}

type TabsContentType = {
    component: ReactNode,
    tab: TabsType | '',
}
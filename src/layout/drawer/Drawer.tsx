import { ReactNode } from "react";
import { Chat } from "./Chat/Chat";
import { Settings } from "./Settings/Settings";
import { TabsType } from "../panel/Panel";
import { Notifications } from "./Notifications/Notifications";
import { Info } from "./Info/Info";
import { Statistic } from "./Statistic/Statistic";
import { StyledDrawer } from "./styled";

type Props = {
  activeTab: TabsType;
  isOpen: boolean;
};
export const Drawer = (props: Props) => {
  return <StyledDrawer isOpen={props.isOpen}>{getTabsContent(props.activeTab)}</StyledDrawer>;
};

const getTabsContent = (tab: TabsType): ReactNode => {
  const tabs: TabsContentType[] = [
    {
      component: <Notifications />,
      tab: "notifications",
    },
    {
      component: <Info />,
      tab: "info",
    },
    {
      component: <Statistic />,
      tab: "statistic",
    },
    {
      component: <Chat />,
      tab: "chat",
    },
    {
      component: <Settings />,
      tab: "settings",
    },
  ];

  return tabs.find((el) => el.tab === tab)?.component;
};

type TabsContentType = {
  component: ReactNode;
  tab: TabsType | "";
};

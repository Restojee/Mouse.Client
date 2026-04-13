import { ReactNode } from "react";
import clsx from "clsx";
import { Chat } from "./Chat/Chat";
import { Settings } from "./Settings/Settings";
import { TabsType } from "../panel/Panel";
import { Notifications } from "./Notifications/Notifications";
import { Info } from "./Info/Info";
import { Statistic } from "./Statistic/Statistic";
import styles from "./Drawer.module.scss";

type Props = {
  activeTab: TabsType;
  isOpen: boolean;
  onClose?: () => void;
};
export const Drawer = (props: Props) => {
  const className = clsx(styles.drawer, props.isOpen ? styles.drawerOpen : styles.drawerClosed);
  const overlayClassName = clsx(styles.overlay, props.isOpen && styles.overlayVisible);
  return (
    <>
      <div
        className={overlayClassName}
        onClick={props.onClose}
      />
      <div className={className}>{getTabsContent(props.activeTab)}</div>
    </>
  );
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

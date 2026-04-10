import * as React from "react";
import { Drawer } from "@/layout/drawer/Drawer";
import { Panel, TabsType } from "@/layout/panel/Panel";
import { Sidebar } from "@/layout/sidebar/Sidebar";
import { Layout, Wrapper } from "@/layout/StyledLayout";
import { Display } from "@/ui/Display";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobilePanel } from "@/layout/mobile/MobilePanel";
import { MapCreateContext } from "@/layout/common/MapCreateContext";

type DefaultProps = {
  children: React.ReactElement;
};

export const LayoutDefault: React.FC<DefaultProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<TabsType>("chat");
  const [createOpen, setCreateOpen] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <MapCreateContext.Provider value={{ createOpen, setCreateOpen }}>
      <Layout>
        <Display condition={!isMobile}>
          <Sidebar />
        </Display>
        <Wrapper>
          {props.children}
          <Display condition={!isMobile}>
            <Drawer
              isOpen={isOpen}
              activeTab={activeTab}
            />
          </Display>
        </Wrapper>
        <Display condition={!isMobile}>
          <Panel
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Display>
        <Display condition={isMobile}>
          <MobilePanel
            createOpen={createOpen}
            setCreateOpen={setCreateOpen}
          />
        </Display>
      </Layout>
    </MapCreateContext.Provider>
  );
};

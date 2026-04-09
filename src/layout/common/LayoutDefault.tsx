import * as React from "react";
import { Drawer } from "@/layout/drawer/Drawer";
import { Panel, TabsType } from "@/layout/panel/Panel";
import { Sidebar } from "@/layout/sidebar/Sidebar";
import { StyledLayout, StyledWrapper } from "@/layout/StyledLayout";
import { Display } from "@/ui/Display";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobilePanel } from "@/layout/mobile/MobilePanel";
import { MobileSheet } from "@/ui/MobileSheet/MobileSheet";

type DefaultProps = {
  children: React.ReactElement;
};
export const LayoutDefault: React.FC<DefaultProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<TabsType>("chat");
  const isMobile = useIsMobile();

  return (
    <StyledLayout>
      <Display condition={!isMobile}>
        <Sidebar />
      </Display>
      <StyledWrapper>
        {props.children}
        <Display condition={isOpen && !isMobile}>
          <Drawer
            isOpen={isOpen}
            activeTab={activeTab}
          />
        </Display>
      </StyledWrapper>
      <Display condition={!isMobile}>
        <Panel
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </Display>
      <Display condition={isMobile}>
        <>
          <MobileSheet
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            zIndex={300}
            height="85dvh"
            noHeader
          >
            <Drawer
              isOpen={isOpen}
              activeTab={activeTab}
            />
          </MobileSheet>
          <MobilePanel
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </>
      </Display>
    </StyledLayout>
  );
};
